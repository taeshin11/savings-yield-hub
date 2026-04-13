const FDIC_BASE = 'https://banks.data.fdic.gov/api';

export interface FDICInstitution {
  name: string;
  cert: number;
  city: string;
  stalp: string;
  asset: number;
  insdate: string;
}

export async function getFDICInfo(bankName: string): Promise<FDICInstitution | null> {
  try {
    const url = `${FDIC_BASE}/institutions?filters=NAME:"${encodeURIComponent(bankName)}"&limit=1&fields=NAME,CERT,CITY,STALP,ASSET,INSDATE&output=json`;
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      const inst = data.data[0].data;
      return {
        name: inst.NAME,
        cert: inst.CERT,
        city: inst.CITY,
        stalp: inst.STALP,
        asset: inst.ASSET,
        insdate: inst.INSDATE,
      };
    }
    return null;
  } catch {
    return null;
  }
}
