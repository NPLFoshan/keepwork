<template>
  <div class="project-white-board">
    <div class="project-white-board-content">
      <div class="project-white-board-content-header">
        <div class="search">
          <el-input size="medium" placeholder="请输入内容" v-model="searchKeyWord" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="全部" value="1"></el-option>
              <el-option label="果果" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <div class="filter">
          筛选：
          <span class="rank"><span class="rank-tip">全部({{issuesList.length}})</span></span>
          <span class="rank"><i class="iconfont icon-check-circle-fill"></i><span class="rank-tip">完成 (55)</span></span>
          <span class="rank"><i class="iconfont icon-warning-circle-fill"></i><span class="rank-tip">进行 (99)</span></span>
        </div>
        <div class="new-issue-btn">
          <el-button type="primary" size="medium" @click="goNewIssue">+ 新建问题</el-button>
        </div>
      </div>
      <div class="project-white-board-content-list">
        <div class="single-issue" v-for="(issue,index) in issuesList" :key="index">
          <div class="single-issue-brief">
            <div class="single-issue-brief-title" @click="goIssueDetail">
              <i class="title-icon iconfont icon-check-circle-fill"></i>
              <span>{{issue.title}}</span><span class="title-number">#8998</span>
            </div>
            <div class="single-issue-brief-intro">
              <span class="created-time">{{relativeTime(issue.updatedAt)}}</span>
              <span class="created-by">由<span class="name">{{issue.user.username}}</span>创建</span>
              <span class="created-tag">
                <span class="tag" v-for="(tag,i) in issueTagArr(issue)" :key="i">{{tag}}</span>
              </span>
            </div>
          </div>
          <div class="single-issue-join">
            <img class="player-portrait" v-for ="player in issue.assigns" :key="player.id" :src="player.portrait" alt="">
          </div>
        </div>
      </div>
    </div>
    <new-issue :show="showNewIssue" @close="closeNewIssue"></new-issue>
    <issue-detail :show="showIssueDetail" @close="closeIssueDetail"></issue-detail>
  </div>
</template>
<script>
import NewIssue from './NewIssue'
import IssueDetail from './IssueDetail'
import _ from 'lodash'
import { keepwork } from '@/api'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { locale } from '@/lib/utils/i18n'
export default {
  name: 'ProjectWhiteBoard',
  data() {
    return {
      showNewIssue: false,
      showIssueDetail: false,
      searchKeyWord: '',
      select: '',
      issuesList: []
    }
  },
  components: {
    NewIssue,
    IssueDetail
  },
  computed: {
    isEn() {
      return locale === 'en-US'
    },
    projectId() {
      return _.get(this.$route, 'params.id')
    }
  },
  mounted(){
    let objectId = this.projectId
    let objectType = 5
    keepwork.issues.getSingleProjectIssues({ objectId, objectType }).then(res => {
      this.issuesList = res.sort(this.sortByUpdateAt)
    }).catch(err => console.error(err))
  },
  methods: {
    goNewIssue() {
      this.showNewIssue = true
    },
    closeNewIssue() {
      this.showNewIssue = false
    },
    goIssueDetail() {
      this.showIssueDetail = true
    },
    closeIssueDetail() {
      this.showIssueDetail = false
    },
    relativeTime(time){
      // console.log('time',moment(time).format('MMMM Do YYYY, h:mm:ss a'))
      this.isEn ? moment.locale('en') : moment.locale('zh-cn')
      return moment(time,"YYYYMMDDHH").fromNow();
    },
    sortByUpdateAt(obj1, obj2) {
      return obj1.updatedAt >= obj2.updatedAt ? -1 : 1
    },
    issueTagArr(issue){
      return _.get(issue, 'tags', '').split('|')
    }
  }
}
</script>

<style lang="scss">
.project-white-board {
  .el-select .el-input {
    min-width: 90px;
  }
  .el-input-group__append {
    background: #fff;
  }
  // .input-with-select .el-input-group__prepend {
  //   background-color: #fff;
  // }
  background: #f5f5f5;
  padding: 24px 0 120px;
  &-content {
    background: #fff;
    max-width: 1200px;
    border: 1px solid #e8e8e8;
    box-sizing: border-box;
    margin: 0 auto;
    &-header {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      border-bottom: 1px solid #e8e8e8;
      .search {
        width: 340px;
      }
      .filter {
        flex: 1;
        font-size: 12px;
        padding-left: 40px;
        display: flex;
        align-items: center;
        .rank {
          margin-left: 14px;
          display: inline-flex;
          align-items: center;
          .icon-check-circle-fill {
            color: #62e08f;
            font-size: 20px;
            margin-right: 4px;
          }
          .icon-warning-circle-fill {
            color: #f3b623;
            font-size: 20px;
            margin-right: 4px;
          }
          &-tip {
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
          }
        }
      }
      .new-issue-btn {
        width: 116px;
      }
    }
    &-list {
      .single-issue {
        padding: 6px 16px;
        display: flex;
        border-bottom: 1px solid #f5f5f5;
        &-brief {
          flex: 1;
          &-title {
            display: flex;
            align-items: center;
            line-height: 35px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            .title-icon {
              font-size: 22px;
              &.icon-warning-circle-fill {
                color: #f3b623;
                margin-right: 13px;
              }
              &.icon-check-circle-fill {
                color: #62e08f;
                margin-right: 13px;
              }
            }
            .title-number {
              color: #909399;
              margin-left: 10px;
            }
          }
          &-intro {
            padding-left: 35px;
            font-size: 12px;
            .created-time {
              color: #909399;
              margin-right: 8px;
            }
            .created-by {
              color: #909399;
              margin-right: 20px;
              .name {
                color: #409eff;
              }
            }
            .created-tag {
              .tag {
                background: #eee;
                color: #909399;
                display: inline-block;
                padding: 2px 4px;
                border-radius: 2px;
                margin-right: 5px;
              }
            }
          }
        }
        &-join {
          width: 30%;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          .player-portrait {
            width: 24px;
            height: 24px;
            object-fit: cover;
            border: 1px solid #eee;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>

