// ========================================
// FONT PRELOADER - SERVER COMPONENT
// ========================================

import { fontCriticalCSS } from '@/utils/font-optimization';

export default function FontPreloader() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontCriticalCSS }} />
    </>
  );
}
