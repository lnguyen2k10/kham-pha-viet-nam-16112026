import { isDemoMode } from '@/lib/data';
export const dynamic = 'force-dynamic';
export function GET() {
  return Response.json({
    status: 'ok',
    service: 'kham-pha-viet-nam',
    contentMode: isDemoMode ? 'demo' : 'curated-public',
    commercialReady: false,
    features: { map: 'available', registration: 'local-draft-only', payments: 'disabled', contentManagement: 'reviewed-git-content', selfServiceAccounts: 'not-connected' },
  }, { headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
