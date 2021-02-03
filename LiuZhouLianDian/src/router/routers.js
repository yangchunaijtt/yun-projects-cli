import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: false
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '首页'
        },
        component: () => import('@/view/home')
      }
    ]
  },
  {
    path: '/page_config',
    name: 'page_config',
    meta: {
      icon: 'logo-buffer',
      title: '基础配置'
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '用户'
        },
        component: () => import('@/view/page-config/users')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          icon: 'md-trending-up',
          title: '角色'
        },
        component: () => import('@/view/page-config/role')
      },
      {
        path: 'production_line',
        name: 'production_line',
        meta: {
          icon: 'md-trending-up',
          title: '产线管理'
        },
        component: () => import('@/view/page-config/production-line')
      },
    ]
  },
  {
    path: '/report-forms',
    name: 'report_forms',
    meta: {
      icon: 'logo-buffer',
      title: '报表管理'
    },
    component: Main,
    children: [
      {
        path: 'early_warning',
        name: 'early_warning',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '预警配置'
        },
        component: () => import('@/view/report-forms/early-warning')
      },
      {
        path: 'ct',
        name: 'ct',
        meta: {
          icon: 'md-trending-up',
          title: 'CT实时看板'
        },
        component: () => import('@/view/report-forms/ct')
      },
      {
        path: 'ct-time',
        name: 'ct_time',
        meta: {
          icon: 'md-trending-up',
          title: '按时间查询CT'
        },
        component: () => import('@/view/report-forms/time')
      },
      {
        path: 'production-ct',
        name: 'production_ct',
        meta: {
          icon: 'md-trending-up',
          title: '按产线工位查询CT'
        },
        component: () => import('@/view/report-forms/production-line')
      },
    ]
  },
  {
    path: '/audit_log',
    name: 'audit_log',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'log',
        name: 'audit_log',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: 'Audit Log'
        },
        component: () => import('@/view/audit-log')
      },
    ]
  },
  {
    path: '/api-config',
    name: 'api_config',
    meta: {
      icon: 'logo-buffer',
      title: '接口管理'
    },
    component: Main,
    children: [
      {
        path: 'production-plan',
        name: 'production_plan',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '生产计划接口'
        },
        component: () => import('@/view/api-config/production-plan')
      },
      {
        path: 'basic-data',
        name: 'basic_data',
        meta: {
          icon: 'md-trending-up',
          title: '基础数据接口'
        },
        component: () => import('@/view/api-config/basic-data')
      },
      {
        path: 'apply',
        name: 'apply',
        meta: {
          icon: 'md-trending-up',
          title: '权限接口'
        },
        component: () => import('@/view/api-config/apply')
      },
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
