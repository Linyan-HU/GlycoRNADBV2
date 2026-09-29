import JbrowserPage from 'src/components/JbrowserPage.vue'; // 导入 JBrowserPage 组件
import HideButton from 'components/HideButton.vue'; // 导入 HideButton 组件

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/jbrowser',
        name: 'JBrowserPage',  // 确保路由有一个明确的 name
        component: () => import('components/JbrowserPage.vue'),
        props: route => ({ location: route.query.location }),
      },
      { path: 'dataset',
        component: () => import('components/DataSet.vue') },
      { path: 'human', component: () => import('components/SequencePage.vue') },

      { path: 'mouse',
        component: () => import('components/MousePage.vue') },

      { path: '/mousestructure/:glycoRNAID',
        name: 'MouseDetailPage', component: () => import('components/MouseDetail.vue'),
        props: true },// 开启props传递
      { path: '/h9structure/:glycoRNAID',
        name: 'H9DetailPage', component: () => import('components/H9Detail.vue'),
        props: true },// 开启props传递
      {path: '/helastructure/:glycoRNAID',
        name: 'HeLaDetailPage', component: () => import('components/HelaDetail.vue'),
        props: true
      },
      {path: '/homostructure/:glycoRNAID',
        name: 'HomoDetailPage', component: () => import('components/HomoDetails.vue'),
        props: true
      },

      { path: 'expression',
        component: () => import('components/ExpressionPage.vue') },
      { path: 'mouseform',
        component: () => import('components/MouseForm.vue') },
      { path: 'glypage',
        component: () => import('components/GlyPage.vue') },
      { path: 'help',
        component: () => import('components/HelpPage.vue') },
      { path: 'download',
        component: () => import('components/DownloadPage.vue') },
      { path: 'aboutus',
        component: () => import('components/AboutusPage.vue') },
      { path: 'blast',
        component: () => import('components/BlastForm.vue') },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
