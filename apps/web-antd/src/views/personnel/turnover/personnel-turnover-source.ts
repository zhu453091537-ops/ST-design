export interface ContractorTurnoverRate {
  contractor: string;
  rate: number;
  resigned: number;
  total: number;
}

export interface PersonnelTurnoverStatCard {
  color?: string;
  title: string;
  type: 'danger' | 'info' | 'primary' | 'success' | 'warning';
  unit?: string;
  value: number | string;
}

const contractorTurnoverSeed: Array<
  Omit<ContractorTurnoverRate, 'rate'>
> = [
  { contractor: '中建三局', resigned: 1, total: 3 },
  { contractor: '中铁十二局', resigned: 1, total: 3 },
  { contractor: '金螳螂装饰', resigned: 0, total: 3 },
  { contractor: '中交一公局', resigned: 0, total: 3 },
  { contractor: '东方园林', resigned: 1, total: 3 },
  { contractor: '城建集团', resigned: 0, total: 3 },
  { contractor: '华为技术', resigned: 0, total: 3 },
  { contractor: '北控水务', resigned: 1, total: 3 },
  { contractor: '中建八局', resigned: 1, total: 3 },
  { contractor: '保安公司', resigned: 0, total: 3 },
];

const turnoverMovementCount = 9;

export async function getPersonnelTurnoverStats(): Promise<
  PersonnelTurnoverStatCard[]
> {
  const contractorRates = await getContractorTurnoverRates();
  const resignedCount = contractorRates.reduce(
    (total, item) => total + item.resigned,
    0,
  );
  const registeredCount = contractorRates.reduce(
    (total, item) => total + item.total,
    0,
  );
  const overallRate = getTurnoverRate(resignedCount, registeredCount);

  return [
    {
      color: '#00c76f',
      title: '本月入职',
      type: 'success',
      value: 0,
    },
    {
      color: '#ef4444',
      title: '本月离职',
      type: 'danger',
      value: resignedCount,
    },
    {
      color: '#f59e0b',
      title: '整体流失率',
      type: 'warning',
      unit: '%',
      value: overallRate.toFixed(1),
    },
    {
      color: '#3578f6',
      title: '变动人次',
      type: 'info',
      value: turnoverMovementCount,
    },
  ];
}

export async function getContractorTurnoverRates(): Promise<
  ContractorTurnoverRate[]
> {
  return contractorTurnoverSeed.map((item) => ({
    ...item,
    rate: getTurnoverRate(item.resigned, item.total),
  }));
}

function getTurnoverRate(resigned: number, total: number) {
  if (total <= 0) {
    return 0;
  }

  return Number(((resigned / total) * 100).toFixed(1));
}
