#!/usr/bin/env node

const https = require('https');
const { performance } = require('perf_hooks');

class PerformanceTester {
  constructor(url) {
    this.url = url;
    this.results = {
      timestamp: new Date().toISOString(),
      url: url,
      metrics: {}
    };
  }

  async measureTTFB() {
    return new Promise((resolve, reject) => {
      const start = performance.now();
      
      const req = https.get(this.url, (res) => {
        const ttfb = performance.now() - start;
        
        this.results.metrics.ttfb = {
          value: Math.round(ttfb),
          unit: 'ms',
          rating: ttfb < 600 ? 'good' : ttfb < 1500 ? 'needs-improvement' : 'poor'
        };
        
        resolve(ttfb);
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
    });
  }

  async measureHeaders() {
    return new Promise((resolve, reject) => {
      const req = https.request(this.url, { method: 'HEAD' }, (res) => {
        const headers = {
          'cache-control': res.headers['cache-control'],
          'cf-cache-status': res.headers['cf-cache-status'],
          'cf-ray': res.headers['cf-ray'],
          'x-vercel-cache': res.headers['x-vercel-cache'],
          'x-vercel-id': res.headers['x-vercel-id'],
          'content-type': res.headers['content-type'],
          'content-length': res.headers['content-length'],
          'server': res.headers['server']
        };
        
        this.results.metrics.headers = headers;
        resolve(headers);
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
      
      req.end();
    });
  }

  async measureResourceSize() {
    return new Promise((resolve, reject) => {
      let totalSize = 0;
      
      const req = https.get(this.url, (res) => {
        res.on('data', (chunk) => {
          totalSize += chunk.length;
        });
        
        res.on('end', () => {
          this.results.metrics.resourceSize = {
            value: totalSize,
            unit: 'bytes',
            formatted: this.formatBytes(totalSize)
          };
          resolve(totalSize);
        });
      });
      
      req.on('error', reject);
      req.setTimeout(15000, () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
    });
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  async runFullTest() {
    console.log('🚀 Iniciando medición de rendimiento...\n');
    
    try {
      // Medir TTFB
      console.log('📊 Midiendo TTFB...');
      await this.measureTTFB();
      
      // Medir Headers
      console.log('📋 Analizando headers...');
      await this.measureHeaders();
      
      // Medir Tamaño del recurso
      console.log('📏 Calculando tamaño del recurso...');
      await this.measureResourceSize();
      
      // Calcular score general
      this.calculateScore();
      
      console.log('\n✅ Medición completada!\n');
      return this.results;
      
    } catch (error) {
      console.error('❌ Error durante la medición:', error.message);
      throw error;
    }
  }

  calculateScore() {
    const { ttfb, resourceSize } = this.results.metrics;
    
    let score = 100;
    
    // Penalizar por TTFB alto
    if (ttfb.value > 600) score -= 30;
    else if (ttfb.value > 300) score -= 15;
    
    // Penalizar por tamaño grande
    if (resourceSize.value > 1000000) score -= 20; // > 1MB
    else if (resourceSize.value > 500000) score -= 10; // > 500KB
    
    // Bonificar por cache headers
    const headers = this.results.metrics.headers;
    if (headers['cf-cache-status'] === 'HIT') score += 10;
    if (headers['x-vercel-cache'] === 'HIT') score += 5;
    
    this.results.metrics.performanceScore = {
      value: Math.max(0, Math.min(100, score)),
      rating: score >= 90 ? 'excellent' : score >= 70 ? 'good' : score >= 50 ? 'needs-improvement' : 'poor'
    };
  }

  printResults() {
    console.log('📊 RESULTADOS DE RENDIMIENTO');
    console.log('============================');
    console.log(`🌐 URL: ${this.results.url}`);
    console.log(`⏰ Timestamp: ${this.results.timestamp}`);
    console.log('');
    
    // TTFB
    const ttfb = this.results.metrics.ttfb;
    console.log(`⚡ TTFB: ${ttfb.value}${ttfb.unit} (${ttfb.rating})`);
    
    // Tamaño del recurso
    const size = this.results.metrics.resourceSize;
    console.log(`📏 Tamaño: ${size.formatted}`);
    
    // Headers importantes
    const headers = this.results.metrics.headers;
    console.log(`🗄️  Cache Status: ${headers['cf-cache-status'] || 'N/A'}`);
    console.log(`☁️  Vercel Cache: ${headers['x-vercel-cache'] || 'N/A'}`);
    console.log(`🖥️  Server: ${headers['server'] || 'N/A'}`);
    
    // Score general
    const score = this.results.metrics.performanceScore;
    console.log(`🎯 Performance Score: ${score.value}/100 (${score.rating})`);
    
    console.log('\n📋 HEADERS COMPLETOS:');
    console.log(JSON.stringify(headers, null, 2));
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const url = process.argv[2] || 'https://fascinantedigital.com';
  const tester = new PerformanceTester(url);
  
  tester.runFullTest()
    .then(() => {
      tester.printResults();
    })
    .catch(error => {
      console.error('Error:', error.message);
      process.exit(1);
    });
}

module.exports = PerformanceTester;
