<template>
  <div class="activated-teacher-role">
    <el-container class="teacher">
      <el-aside width="260px">
        <el-menu :default-active="itmeActive" class="el-menu-vertical-demo" text-color='#b3b3b3' active-text-color='#fff'>
          <el-menu-item index="1" @click="showItem('TEACH')">
            <i class="iconfont icon-teach"></i>
            <span class="item-title" slot="title">{{$t('lesson.teach')}}</span>
          </el-menu-item>
          <el-menu-item index="2" @click="showItem('REVIEW')">
            <i class="iconfont icon-review"></i>
            <span class="item-title" slot="title">{{$t('lesson.review')}}</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">
              <i class="iconfont icon-setting"></i>
              <span class="item-title">{{$t('lesson.lessonManagement')}}</span>
            </template>
            <el-menu-item index="3-1" @click="showItem('LESSON_MANAGER')">{{$t('lesson.lessonManage.lessonTitle')}}</el-menu-item>
            <el-menu-item index="3-2" @click="showItem('PACKAGE_MANAGER')">{{$t('lesson.packageManage.package')}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="activated-teacher-role-container">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
export default {
  name: 'ActivatedTeacherRole',
  data() {
    return {
      itmeActive: '1'
    }
  },
  mounted() {
    this.setActiveItem()
  },
  methods: {
    setActiveItem() {
      switch (this.$route.name) {
        case 'TeacherColumnReview':
          this.itmeActive = '2'
          break
        case 'TeacherColumnNewLesson':
        case 'TeacherColumnLessonManager':
        case 'TeacherColumnEditLesson':
          this.itmeActive = '3-1'
          break
        case 'TeacherColumnNewPackage':
        case 'TeacherColumnEditPackage':
        case 'TeacherColumnPackageManager':
          this.itmeActive = '3-2'
          break
        default:
          this.itmeActive = '1'
      }
    },
    showItem(itemName) {
      switch (itemName) {
        case 'TEACH':
          this.$router.push({
            path: `/teacher`
          })
          break
        case 'REVIEW':
          this.$router.push({
            path: `/teacher/review`
          })
          break
        case 'LESSON_MANAGER':
          this.$router.push({
            path: `/teacher/lessonManager`
          })
          break
        case 'PACKAGE_MANAGER':
          this.$router.push({
            path: `/teacher/packageManager`
          })
          break
        case 'MANAGEMENT':
          break
        default:
          break
      }
    }
  },
  watch: {
    $route() {
      this.setActiveItem()
    }
  }
}
</script>

<style lang="scss">
.activated-teacher-role {
  &-container {
    height: 100%;
    margin: 0;
    overflow: auto;
  }
  .teacher {
    margin: 0 auto;
    max-width: 1150px;
    height: 100%;
    .el-aside {
      padding: 80px 0;
      background: #2f3541;
      border-right: 8px solid #409efe;
      overflow: hidden;
      margin-right: 38px;
      .el-menu {
        border: none;
        background-color: transparent;
        .el-menu-item,
        .el-submenu__title {
          height: 60px;
          line-height: 60px;
          padding: 0 15px 0 10px;
          padding-left: 10px !important;
          font-weight: bold;
          i {
            font-size: 24px;
            margin-right: 10px;
            font-weight: normal;
          }
          .el-icon-arrow-down {
            font-size: 16px;
            margin-right: unset;
            right: 10px;
          }
        }
        .el-menu-item.is-active,
        .el-menu-item.is-active:hover {
          background-color: #409efe;
        }
        .el-menu-item:hover,
        .el-submenu__title:hover {
          background-color: #434a50;
        }
        .el-submenu .el-menu-item {
          height: 40px;
          line-height: 40px;
          padding-left: 50px !important;
          font-weight: normal;
        }
        .el-submenu.is-active .el-submenu__title {
          .item-title,
          i {
            color: #fff;
          }
        }
      }
    }
    .el-main {
      overflow: hidden;
      padding: 50px 0;
    }
  }
}
</style>


