export type ProjectInformationStatus =
  | 'archived'
  | 'completed'
  | 'pending'
  | 'running';

export interface ProjectInformationQuery {
  keyword?: string;
  status?: '' | ProjectInformationStatus;
  type?: string;
}

export interface ProjectInformationRecord {
  amount: number;
  bidOpenDate: string;
  biddingResult: string;
  code: string;
  contractor: string;
  department: string;
  description: string;
  durationDays: number;
  entryDate: string;
  equipmentList: string;
  filingCode: string;
  id: number;
  manager: string;
  name: string;
  plannedExitDate: string;
  procurementAgency: string;
  procurementMethod: string;
  singleSourceFilingCode: string;
  staffing: string;
  status: ProjectInformationStatus;
  type: string;
}

export const projectInformationTypeOptions = [
  { label: '全部类型', value: '' },
  { label: '房建工程', value: '房建工程' },
  { label: '市政工程', value: '市政工程' },
  { label: '装饰装修', value: '装饰装修' },
  { label: '基础设施', value: '基础设施' },
  { label: '园林景观', value: '园林景观' },
  { label: '特种设备维保', value: '特种设备维保' },
  { label: '车辆整改', value: '车辆整改' },
  { label: '轨道桥隧维保', value: '轨道桥隧维保' },
  { label: '保安保洁', value: '保安保洁' },
];

export const projectInformationStatusOptions = [
  { label: '全部状态', value: '' },
  { label: '待启动', value: 'pending' },
  { label: '进行中', value: 'running' },
  { label: '已完成', value: 'completed' },
  { label: '已归档', value: 'archived' },
];

export const projectInformationDepartmentOptions = [
  { label: '工程一部', value: '工程一部' },
  { label: '工程二部', value: '工程二部' },
  { label: '工程三部', value: '工程三部' },
  { label: '设计院', value: '设计院' },
  { label: '设备管理部', value: '设备管理部' },
];

export const projectInformationProcurementMethodOptions = [
  { label: '公开招标', value: '公开招标' },
  { label: '邀请招标', value: '邀请招标' },
  { label: '竞争性谈判', value: '竞争性谈判' },
  { label: '单一来源采购', value: '单一来源采购' },
  { label: '询价采购', value: '询价采购' },
];

export const projectInformationBiddingResultOptions = [
  { label: '中标', value: '中标' },
  { label: '流标', value: '流标' },
  { label: '废标', value: '废标' },
  { label: '待定', value: '待定' },
];

export const projectInformationStatusMap: Record<
  ProjectInformationStatus,
  {
    label: string;
    status: 'default' | 'error' | 'processing' | 'success' | 'warning';
  }
> = {
  archived: { label: '已归档', status: 'default' },
  completed: { label: '已完成', status: 'success' },
  pending: { label: '待启动', status: 'warning' },
  running: { label: '进行中', status: 'processing' },
};

let projectInformationRows: ProjectInformationRecord[] = [
  {
    amount: 11_578,
    bidOpenDate: '2025-12-12',
    biddingResult: '中建二局中标',
    code: 'PJ2026001',
    contractor: '中建二局',
    department: '工程一部',
    description: '城市核心区综合体委外建设项目。',
    durationDays: 626,
    entryDate: '2026-01-05',
    equipmentList: '塔吊2台、升降机4台、混凝土泵车2台',
    filingCode: 'BA-2026-001',
    id: 1,
    manager: '张明远',
    name: '城市中央商务区A栋综合体',
    plannedExitDate: '2027-09-18',
    procurementAgency: '华诚招标代理',
    procurementMethod: '公开招标',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、安全员3人、施工人员86人',
    status: 'running',
    type: '房建工程',
  },
  {
    amount: 17_608,
    bidOpenDate: '2025-12-18',
    biddingResult: '中铁十二局中标',
    code: 'PJ2026002',
    contractor: '中铁十二局',
    department: '工程二部',
    description: '滨河路主路、辅路及配套管网改造。',
    durationDays: 803,
    entryDate: '2026-02-10',
    equipmentList: '摊铺机2台、压路机6台、运输车18台',
    filingCode: 'BA-2026-002',
    id: 2,
    manager: '刘海涛',
    name: '滨河路市政道路改造工程',
    plannedExitDate: '2028-03-15',
    procurementAgency: '城建招采中心',
    procurementMethod: '邀请招标',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、技术员5人、施工人员72人',
    status: 'pending',
    type: '市政工程',
  },
  {
    amount: 28_947,
    bidOpenDate: '2025-11-29',
    biddingResult: '金螳螂装饰中标',
    code: 'PJ2026003',
    contractor: '金螳螂装饰',
    department: '工程三部',
    description: '科技产业园办公区和公共区域精装修。',
    durationDays: 812,
    entryDate: '2026-01-12',
    equipmentList: '脚手架12套、喷涂设备8套、运输车6台',
    filingCode: 'BA-2026-003',
    id: 3,
    manager: '陈思雅',
    name: '科技产业园精装修项目',
    plannedExitDate: '2028-03-24',
    procurementAgency: '启明工程咨询',
    procurementMethod: '竞争性谈判',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、设计协调3人、施工人员64人',
    status: 'completed',
    type: '装饰装修',
  },
  {
    amount: 4578,
    bidOpenDate: '2025-12-05',
    biddingResult: '中交一公局中标',
    code: 'PJ2026004',
    contractor: '中交一公局',
    department: '设计院',
    description: '新区地下综合管廊施工与机电安装。',
    durationDays: 940,
    entryDate: '2026-01-20',
    equipmentList: '盾构配套设备1批、吊装设备3台',
    filingCode: 'BA-2026-004',
    id: 4,
    manager: '赵国强',
    name: '新区综合管廊工程',
    plannedExitDate: '2028-07-30',
    procurementAgency: '中咨招标',
    procurementMethod: '单一来源采购',
    singleSourceFilingCode: 'DY-2026-004',
    staffing: '项目经理1人、机电人员12人、施工人员45人',
    status: 'archived',
    type: '基础设施',
  },
  {
    amount: 15_169,
    bidOpenDate: '2025-12-21',
    biddingResult: '东方园林中标',
    code: 'PJ2026005',
    contractor: '东方园林',
    department: '设备管理部',
    description: '湿地公园园林景观、绿化养护和栈道修缮。',
    durationDays: 716,
    entryDate: '2026-02-01',
    equipmentList: '洒水车4台、修剪设备20套、运输车8台',
    filingCode: 'BA-2026-005',
    id: 5,
    manager: '林雨桐',
    name: '湿地公园景观绿化工程',
    plannedExitDate: '2027-12-20',
    procurementAgency: '绿城咨询',
    procurementMethod: '询价采购',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、养护人员38人、巡检人员6人',
    status: 'running',
    type: '园林景观',
  },
  {
    amount: 38_097,
    bidOpenDate: '2025-12-25',
    biddingResult: '城建集团中标',
    code: 'PJ2026006',
    contractor: '城建集团',
    department: '工程一部',
    description: '老旧小区公共区域、道路和附属设施改造。',
    durationDays: 534,
    entryDate: '2026-02-15',
    equipmentList: '起重设备2台、运输车12台、检测设备1批',
    filingCode: 'BA-2026-006',
    id: 6,
    manager: '王建华',
    name: '老旧小区改造提升项目',
    plannedExitDate: '2027-06-21',
    procurementAgency: '城投招标代理',
    procurementMethod: '公开招标',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、安全员2人、施工人员96人',
    status: 'pending',
    type: '特种设备维保',
  },
  {
    amount: 40_343,
    bidOpenDate: '2025-11-17',
    biddingResult: '中交二航局中标',
    code: 'PJ2026007',
    contractor: '中交二航局',
    department: '工程二部',
    description: '跨河大桥主体施工和附属交通设施建设。',
    durationDays: 270,
    entryDate: '2026-01-08',
    equipmentList: '架桥机1台、吊车6台、运输车20台',
    filingCode: 'BA-2026-007',
    id: 7,
    manager: '孙立民',
    name: '跨河大桥新建工程',
    plannedExitDate: '2026-09-29',
    procurementAgency: '交通工程咨询',
    procurementMethod: '邀请招标',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、技术员8人、施工人员110人',
    status: 'completed',
    type: '车辆整改',
  },
  {
    amount: 9559,
    bidOpenDate: '2025-12-09',
    biddingResult: '华为技术中标',
    code: 'PJ2026008',
    contractor: '华为技术',
    department: '工程三部',
    description: '智慧园区弱电、网络和安防系统集成。',
    durationDays: 385,
    entryDate: '2026-01-16',
    equipmentList: '交换机42台、摄像头260套、布线设备1批',
    filingCode: 'BA-2026-008',
    id: 8,
    manager: '何晓峰',
    name: '智慧园区弱电系统工程',
    plannedExitDate: '2027-01-23',
    procurementAgency: '数智招采中心',
    procurementMethod: '竞争性谈判',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、实施工程师14人、施工人员36人',
    status: 'archived',
    type: '轨道桥隧维保',
  },
  {
    amount: 3694,
    bidOpenDate: '2025-12-28',
    biddingResult: '北控水务中标',
    code: 'PJ2026009',
    contractor: '北控水务',
    department: '设计院',
    description: '城南污水处理厂扩容和配套管线改造。',
    durationDays: 912,
    entryDate: '2026-02-20',
    equipmentList: '泵站设备1批、检测设备12套、运输车5台',
    filingCode: 'BA-2026-009',
    id: 9,
    manager: '杨志刚',
    name: '城南污水处理厂扩容',
    plannedExitDate: '2028-07-02',
    procurementAgency: '水务工程咨询',
    procurementMethod: '单一来源采购',
    singleSourceFilingCode: 'DY-2026-009',
    staffing: '项目经理1人、工艺工程师4人、施工人员52人',
    status: 'running',
    type: '保安保洁',
  },
  {
    amount: 2753,
    bidOpenDate: '2025-12-30',
    biddingResult: '中建八局中标',
    code: 'PJ2026010',
    contractor: '中建八局',
    department: '设备管理部',
    description: '市民广场地下停车场主体结构和机电工程。',
    durationDays: 792,
    entryDate: '2026-03-01',
    equipmentList: '挖掘机4台、吊车3台、通风设备1批',
    filingCode: 'BA-2026-010',
    id: 10,
    manager: '周敏',
    name: '市民广场地下停车场',
    plannedExitDate: '2028-03-03',
    procurementAgency: '广场项目招采组',
    procurementMethod: '询价采购',
    singleSourceFilingCode: '',
    staffing: '项目经理1人、机电人员10人、施工人员68人',
    status: 'pending',
    type: '房建工程',
  },
];

export async function getProjectInformationList(
  query: ProjectInformationQuery,
) {
  const keyword = query.keyword?.trim().toLowerCase();

  return projectInformationRows.filter((item) => {
    const matchedKeyword = keyword
      ? [item.name, item.code, item.manager].some((field) =>
          field.toLowerCase().includes(keyword),
        )
      : true;
    const matchedStatus = query.status ? item.status === query.status : true;
    const matchedType = query.type ? item.type === query.type : true;

    return matchedKeyword && matchedStatus && matchedType;
  });
}

export async function saveProjectInformationProject(
  project: Partial<ProjectInformationRecord>,
) {
  if (project.id) {
    projectInformationRows = projectInformationRows.map((item) =>
      item.id === project.id
        ? ({ ...item, ...project } as ProjectInformationRecord)
        : item,
    );
    return;
  }

  const nextId = Math.max(...projectInformationRows.map((item) => item.id)) + 1;
  projectInformationRows = [
    {
      amount: project.amount ?? 0,
      bidOpenDate: project.bidOpenDate || '',
      biddingResult: project.biddingResult || '',
      code: project.code || `PJ${2_026_000 + nextId}`,
      contractor: project.contractor || '',
      department: project.department || '',
      description: project.description || '',
      durationDays: project.durationDays ?? 0,
      entryDate: project.entryDate || '',
      equipmentList: project.equipmentList || '',
      filingCode: project.filingCode || '',
      id: nextId,
      manager: project.manager || '',
      name: project.name || '未命名项目',
      plannedExitDate: project.plannedExitDate || '',
      procurementAgency: project.procurementAgency || '',
      procurementMethod: project.procurementMethod || '',
      singleSourceFilingCode: project.singleSourceFilingCode || '',
      staffing: project.staffing || '',
      status: project.status || 'pending',
      type: project.type || '房建工程',
    },
    ...projectInformationRows,
  ];
}

export async function archiveProjectInformationProject(id: number) {
  projectInformationRows = projectInformationRows.map((item) =>
    item.id === id ? { ...item, status: 'archived' } : item,
  );
}

export async function deleteProjectInformationProject(id: number) {
  projectInformationRows = projectInformationRows.filter(
    (item) => item.id !== id,
  );
}
