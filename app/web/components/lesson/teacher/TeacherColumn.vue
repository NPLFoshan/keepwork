<template>
  <div class="teacher-column">
    <activated-teacher-role class="teacher-column-activated" v-if="userinfo.identify === 2"></activated-teacher-role>
    <not-activated-teacher-role v-else></not-activated-teacher-role>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NotActivatedTeacherRole from './NotActivatedTeacherRole'
import ActivatedTeacherRole from './ActivatedTeacherRole'

export default {
  name: 'TeacherColumn',
  data() {
    return {}
  },
  async created() {
    await this.getUserDetail()
  },
  computed: {
    ...mapGetters({
      userinfo: 'lesson/userinfo'
    })
  },
  methods: {
    ...mapActions({
      getUserDetail: 'lesson/getUserDetail'
    })
  },
  components: {
    NotActivatedTeacherRole,
    ActivatedTeacherRole
  }
}
</script>

<style lang="scss">
.teacher-column {
  height: 100%;
  &-activated {
    height: 100%;
  }
}
</style>
