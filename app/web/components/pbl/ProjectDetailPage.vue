<template>
  <div class="project-detail-page">
    <project-header class="project-detail-page-header" :projectDetail="pblProjectDetail" :editingUserId='editingUserId' :editingProjectUsername='editingProjectUsername' v-if="!isFirstGettingData" :isLoginUserEditable='loginUserIsProjectOwner'></project-header>
    <router-view v-if="!isFirstGettingData" :pblProjectDetail='pblProjectDetail' :projectId='projectId' :originProjectUsername='editingProjectUsername' :projectOwnerPortrait='projectOwnerPortrait' :isLoginUserEditable='loginUserIsProjectOwner'></router-view>
  </div>
</template>
<script>
import ProjectHeader from './common/ProjectHeader'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ProjectDetailPage',
  async created() {
    this.initProjectDetail()
  },
  computed: {
    ...mapGetters({
      projectDetail: 'pbl/projectDetail',
      getDetailByUserId: 'user/getDetailByUserId',
      loginUsername: 'user/username'
    }),
    pblProjectDetail() {
      return this.projectDetail({ projectId: this.projectId })
    },
    projectId() {
      return _.toNumber(_.get(this.$route, 'params.id'))
    },
    editingProjectUser() {
      let userId = this.editingUserId
      return this.getDetailByUserId({ userId })
    },
    editingProjectUsername() {
      return _.get(this.editingProjectUser, 'username')
    },
    projectOwnerPortrait() {
      return _.get(this.editingProjectUser, 'portrait')
    },
    loginUserIsProjectOwner() {
      return this.loginUsername === this.editingProjectUsername
    }
  },
  data() {
    return {
      isLoading: true,
      editingUserId: undefined,
      isFirstGettingData: true
    }
  },
  methods: {
    ...mapActions({
      pblGetProjectDetail: 'pbl/getProjectDetail',
      getUserDetailByUserId: 'user/getUserDetailByUserId',
      getFavoriteState: 'pbl/getFavoriteState',
      getStarState: 'pbl/getStarState'
    }),
    async initProjectDetail() {
      this.isFirstGettingData = true
      this.isLoading = true
      await this.pblGetProjectDetail({ projectId: this.projectId })
      await this.initProjectHeaderDetail()
      this.isFirstGettingData = false
      this.isLoading = false
    },
    async initProjectHeaderDetail() {
      this.editingUserId = _.get(this.pblProjectDetail, 'userId')
      let userId = this.editingUserId
      let objectId = this.projectId
      let objectType = 5
      let promiseArray = [
        this.getUserDetailByUserId({ userId }),
        this.getFavoriteState({ objectId, objectType }),
        this.getStarState({ projectId: objectId })
      ]
      await Promise.all(
        _.map(promiseArray, promiseItem => {
          return promiseItem.catch(error => {
            return error
          })
        })
      )
    }
  },
  components: {
    ProjectHeader
  },
  watch: {
    $route: function(val) {
      this.initProjectDetail()
    }
  }
}
</script>
