import{Fr as e,It as t,Tt as n,Z as r,Zr as i,cr as a,gi as o,gr as s,gt as c,mr as l,or as u,ot as d,pr as f,si as p,sr as m,yr as h,yt as g}from"./antdv-next-Bbl__uyc.js";import{Vt as _}from"./store-DMRyosvH.js";import{t as v}from"./code-mirror-DOFhD699.js";import{t as y}from"./page-C8SHoCDr.js";import{t as b}from"./dict-enum-DfTbNkQC.js";import{t as x}from"./toString-qUGJAL8Z.js";import{t as S}from"./toInteger-yipuR5lv.js";import{t as C}from"./dict-CGy7RAdm.js";import{t as w}from"./dict-BDroimvb.js";var T=9007199254740991,E=Math.floor;function D(e,t){var n=``;if(!e||t<1||t>T)return n;do t%2&&(n+=e),t=E(t/2),t&&(e+=e);while(t);return n}function O(e,t,n){return t=(n?_(e,t,n):t===void 0)?1:S(t),D(x(e),t)}var k={class:`grid grid-cols-2 gap-4`},A={class:`mb-2 text-black/55`},j=`
const options = getDictOptions(DictEnum.SYS_COMMON_STATUS);
`,M=`
const options = reactive([]);
onMounted(async () => {
  const resp = await dictDataInfo(DictEnum.SYS_COMMON_STATUS);
  options.push(...resp);
})
`,N=`
{
  component: 'Select',
  componentProps: {
    // 不生效的写法
    // options: getDictOptions(DictEnum.SYS_COMMON_STATUS).filter((item) => item.value !== '0'),
    // 正确写法
    options: computed(() => {
      const options = getDictOptions(DictEnum.SYS_COMMON_STATUS);
      return options.filter((item) => item.value !== '0');
    }),
  },
  fieldName: 'status',
  label: '状态',
},
`,P=s({__name:`index`,setup(s){let _=C(b.SYS_COMMON_STATUS),x=p(`1`),S=u(()=>_.filter(e=>e.dictValue!==`1`)),T=[{content:l(w,{dicts:_,value:`error`},null),label:`默认为unknown`},{content:l(w,{dicts:_,fallback:`自定义的fallback`,value:`error`},null),label:`直接返回string`},{content:l(w,{dicts:_,fallback:e=>O(String(e),5),value:`error`},null),label:`函数返回string`},{content:l(w,{dicts:_,fallback:e=>h(`span`,{class:`text-red-500`},`${e} 没有匹配到值`),value:`error`},null),label:`函数返回VNode`},{content:l(w,{dicts:_,value:`error`},{fallback:e=>l(`span`,{class:`text-red-500`},[f(` `),e,f(` 跟上面相同的写法 `)])}),label:`使用fallback插槽`}];return(s,u)=>(e(),a(o(y),{"content-class":`flex flex-col gap-4`},{default:i(()=>[l(o(c),{size:`small`,title:`核心逻辑`},{default:i(()=>[u[2]||(u[2]=m(`p`,{class:`mb-2`},` 你可以简单理解为getDictOptions是以下代码的快捷方式(还包括对并发和缓存的处理) `,-1)),m(`div`,k,[l(o(v),{readonly:``,"model-value":j,language:`js`}),l(o(v),{readonly:``,"model-value":M,language:`js`})])]),_:1}),l(o(c),{size:`small`},{title:i(()=>[...u[3]||(u[3]=[f(` 选择器组件使用 `,-1),m(`a`,{href:`https://dapdap.top/function/dict.html`,class:`text-primary`,target:`_blank`},` 文档参考 `,-1)])]),default:i(()=>[l(o(d),null,{default:i(()=>[l(o(n),{value:x.value,"onUpdate:value":u[0]||(u[0]=e=>x.value=e),options:o(_)},null,8,[`value`,`options`]),l(o(g),{value:x.value,"onUpdate:value":u[1]||(u[1]=e=>x.value=e),options:o(_)},null,8,[`value`,`options`]),u[4]||(u[4]=f(` 渲染: `,-1)),l(o(w),{value:x.value,dicts:o(_)},null,8,[`value`,`dicts`])]),_:1}),l(o(t),{class:`mt-2`,"show-icon":``,type:`success`,message:`getDictOptions返回值为reactive 可直接绑定使用!`}),l(o(t),{class:`mt-2`,"show-icon":``,type:`error`,message:`getDictOptions内部为异步实现 不要使用它参与业务运算!`})]),_:1}),l(o(c),{size:`small`,title:`字典标签 - 未匹配到值的fallback`},{default:i(()=>[l(o(r),{column:1,items:T})]),_:1}),l(o(c),{size:`small`,title:`给 Form 组件赋值前 需要处理字典后展示的情况`},{default:i(()=>[m(`p`,A,[l(o(n),{class:`w-[200px]`,options:S.value},null,8,[`options`]),u[5]||(u[5]=f(` 这里使用computed过滤了部分选项 `,-1)),u[6]||(u[6]=m(`a`,{class:`font-semibold text-primary`,target:`_blank`,href:`https://dapdap.top/function/dict.html#%E7%BB%99-form-%E7%BB%84%E4%BB%B6%E8%B5%8B%E5%80%BC%E5%89%8D-%E9%9C%80%E8%A6%81%E5%81%9A%E5%A4%84%E7%90%86%E5%AD%97%E5%85%B8%E5%90%8E%E5%B1%95%E7%A4%BA%E7%9A%84%E6%83%85%E5%86%B5`},` 相关文档 `,-1))]),u[7]||(u[7]=m(`p`,{class:`mb-2 text-red-500`},`简单描述就是套一层computed就行`,-1)),l(o(v),{readonly:``,"model-value":N,language:`js`})]),_:1})]),_:1}))}});export{P as default};