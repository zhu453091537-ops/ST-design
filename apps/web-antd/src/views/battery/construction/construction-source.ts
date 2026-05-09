export type ConstructionStatus = 'completed' | 'draft' | 'pending';

export interface ConstructionQuery {
  businessType: '' | ConstructionRecord['businessType'];
  projectName: string;
  submittedDateRange: string[];
  projectYear: '' | number;
  status: '' | ConstructionStatus;
  submitter: string;
}

export interface ConstructionRecord {
  id: number;
  permitCode: string;
  businessType: '许可证办理' | '许可证变更';
  projectCode: string;
  projectName: string;
  projectYear: number;
  plannedEndDate: string;
  plannedStartDate: string;
  status: ConstructionStatus;
  submitter: string;
  submittedAt: string;
}

type ConstructionStatusMeta = {
  label: string;
  status: 'default' | 'processing' | 'success' | 'warning';
};

export const constructionYearOptions = [
  { label: '全部年度', value: '' },
  { label: '2027', value: 2027 },
  { label: '2026', value: 2026 },
  { label: '2025', value: 2025 },
  { label: '2024', value: 2024 },
];

export const constructionStatusOptions = [
  { label: '全部状态', value: '' },
  { label: '草稿', value: 'draft' },
  { label: '待审批', value: 'pending' },
  { label: '已办结', value: 'completed' },
];

export const constructionSubmitterOptions = [
  { label: '全部提交人', value: '' },
  { label: '李林杰', value: '李林杰' },
  { label: '王栋', value: '王栋' },
  { label: '周敬然', value: '周敬然' },
  { label: '张乾方', value: '张乾方' },
  { label: '宋腾飞', value: '宋腾飞' },
  { label: '李西彤', value: '李西彤' },
];

export const constructionBusinessTypeOptions = [
  { label: '全部业务类型', value: '' },
  { label: '许可证办理', value: '许可证办理' },
  { label: '许可证变更', value: '许可证变更' },
];

export const constructionStatusMap: Record<
  ConstructionStatus,
  ConstructionStatusMeta
> = {
  completed: {
    label: '已办结',
    status: 'success',
  },
  draft: {
    label: '草稿',
    status: 'default',
  },
  pending: {
    label: '待审批',
    status: 'warning',
  },
};

const constructionRows: ConstructionRecord[] = [
  {
    businessType: '许可证变更',
    id: 1,
    permitCode: '',
    plannedEndDate: '2027-11-30',
    plannedStartDate: '2025-12-01',
    projectCode: 'BHW-PW-CG25085/001',
    projectName: '2025-2027（2年）年外包施工维护项目',
    projectYear: 2025,
    status: 'draft',
    submittedAt: '',
    submitter: '',
  },
  {
    businessType: '许可证办理',
    id: 2,
    permitCode: '',
    plannedEndDate: '2026-12-20',
    plannedStartDate: '2025-02-20',
    projectCode: 'BHW-PW-CG24078/001',
    projectName: '#1、2、3机汽机真空系统查漏整治项目',
    projectYear: 2024,
    status: 'pending',
    submittedAt: '2025-04-10 13:51:03',
    submitter: '李林杰',
  },
  {
    businessType: '许可证办理',
    id: 3,
    permitCode: '',
    plannedEndDate: '2027-11-18',
    plannedStartDate: '2025-11-19',
    projectCode: 'BHW-H-F-2025-Z-036',
    projectName: '广东粤电滨海湾能源有限公司年度检修工程',
    projectYear: 2025,
    status: 'pending',
    submittedAt: '2026-01-09 15:04:29',
    submitter: '王栋',
  },
  {
    businessType: '许可证办理',
    id: 4,
    permitCode: '2024001',
    plannedEndDate: '2027-05-13',
    plannedStartDate: '2024-05-13',
    projectCode: 'BHW-PW-CG24004',
    projectName: '广东粤电滨海湾能源有限公司年度机务检修项目',
    projectYear: 2024,
    status: 'completed',
    submittedAt: '2024-08-19 15:57:52',
    submitter: '周敬然',
  },
  {
    businessType: '许可证办理',
    id: 5,
    permitCode: '2024002',
    plannedEndDate: '2026-07-15',
    plannedStartDate: '2024-07-16',
    projectCode: 'BHJSCZT2024H007',
    projectName: '广东粤电滨海湾能源有限公司脚手架搭设项目',
    projectYear: 2024,
    status: 'completed',
    submittedAt: '2024-08-26 08:17:15',
    submitter: '张乾方',
  },
  {
    businessType: '许可证办理',
    id: 6,
    permitCode: '2024004',
    plannedEndDate: '2026-05-31',
    plannedStartDate: '2024-06-01',
    projectCode: 'BHJQTZT2024W009',
    projectName: '广东粤电滨海湾能源有限公司起重作业专项项目',
    projectYear: 2024,
    status: 'completed',
    submittedAt: '2024-09-11 08:52:01',
    submitter: '宋腾飞',
  },
  {
    businessType: '许可证办理',
    id: 7,
    permitCode: '2024006',
    plannedEndDate: '2026-10-31',
    plannedStartDate: '2024-11-01',
    projectCode: 'BHW-PW-CG24031',
    projectName: '2024-2026年全厂安全阀整定及检测项目',
    projectYear: 2024,
    status: 'completed',
    submittedAt: '2024-10-23 10:13:40',
    submitter: '李西彤',
  },
];

export async function getConstructionList(query: ConstructionQuery) {
  const keyword = query.projectName.trim();
  const submitterKeyword = query.submitter.trim();
  const [startDate, endDate] = query.submittedDateRange;

  return constructionRows.filter((item) => {
    const matchesKeyword =
      !keyword ||
      [
        item.projectName,
        item.projectCode,
        item.permitCode,
        item.submitter,
      ].some((value) => value.toLowerCase().includes(keyword.toLowerCase()));

    const matchesYear =
      !query.projectYear || item.projectYear === query.projectYear;
    const matchesStatus = !query.status || item.status === query.status;
    const matchesSubmitter =
      !submitterKeyword ||
      item.submitter.toLowerCase().includes(submitterKeyword.toLowerCase());
    const matchesBusinessType =
      !query.businessType || item.businessType === query.businessType;
    const matchesSubmittedRange =
      !startDate ||
      !endDate ||
      (item.submittedAt &&
        item.submittedAt.slice(0, 10) >= startDate &&
        item.submittedAt.slice(0, 10) <= endDate);

    return (
      matchesKeyword &&
      matchesYear &&
      matchesStatus &&
      matchesSubmitter &&
      matchesBusinessType &&
      matchesSubmittedRange
    );
  });
}

export function getConstructionStatusMeta(status: ConstructionStatus) {
  return constructionStatusMap[status];
}
