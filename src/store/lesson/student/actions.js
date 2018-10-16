import { lesson } from '@/api'
import { props } from './mutations'
import Parser from '@/lib/mod/parser'
import _ from 'lodash'
// import uuid from 'uuid/v1'

let {
  SET_USER_SUBSCRIBES,
  GET_PACKAGE_DETAIL_SUCCESS,
  GET_LESSON_CONTENT_SUCCESS,
  ENTER_CLASSROOM,
  RESUME_CLASSROOM,
  SAVE_LESSON_DETAIL,
  DO_QUIZ,
  RESUME_QUIZ,
  SET_ENTER_CLASS_ID,
  SWITCH_SUMMARY,
  LEAVE_THE_CLASS,
  CREATE_LEARN_RECORDS_SUCCESS,
  CLEAR_LEARN_RECORDS_ID,
  CLEAR_LESSON_DATA,
  CHANGE_STATUS,
  SWITCH_DEVICE
} = props

const actions = {
  async getUserSubscribes(
    {
      commit,
      rootGetters: { 'lesson/userId': userId }
    },
    { packageState }
  ) {
    let userSubscribes = await lesson.users.userSubscribes({
      userId,
      packageState
    })
    commit(SET_USER_SUBSCRIBES, userSubscribes)
  },
  async getPackageDetail({ commit }, { packageId }) {
    let detail = await lesson.packages.packageDetail({
      id: packageId
    })
    commit(GET_PACKAGE_DETAIL_SUCCESS, {
      detail
    })
  },
  async getLessonContent({ commit }, { lessonId }) {
    let [res, detail] = await Promise.all([
      lesson.lessons.lessonContent({ lessonId }),
      lesson.lessons.lessonDetail({ lessonId })
    ])
    let modList = Parser.buildBlockList(res.content)
    // modList.forEach(mod => {
    //   if (mod.cmd === 'Quiz') {
    //     let _id = uuid()
    //     mod.data.quiz.data[0].id = _id
    //     mod.uuid = _id
    //   }
    // })
    let quiz = modList
      .filter(({ cmd }) => cmd === 'Quiz')
      .map(({ data: { quiz: { data } } }) => ({
        key: data[0].id,
        data: data[0],
        result: null,
        answer: null
      }))
    commit(GET_LESSON_CONTENT_SUCCESS, {
      lessonId,
      content: res.content
    })
    commit(SAVE_LESSON_DETAIL, {
      lessonId,
      lesson: detail,
      quiz,
      modList
    })
    commit(CLEAR_LEARN_RECORDS_ID)
  },
  async subscribePackage({ context }, { packageId }) {
    let subscribeResult = await lesson.packages.subscribe({
      id: packageId
    })
    return subscribeResult
  },
  async enterClassRoom({ commit, dispatch }, { key }) {
    let enterClassInfo = await lesson.classrooms.join({
      key: key
    })
    enterClassInfo['key'] = key
    commit(ENTER_CLASSROOM, enterClassInfo)
  },
  async resumeTheClass({ commit, dispatch }) {
    // await dispatch('lesson/getUserDetail', null, { root: true })
    let classroom = await lesson.classrooms
      .currentClass()
      .catch(e => console.error(e))
    if (!classroom) {
      return
    }
    dispatch('resumeClassData', classroom)
  },
  async resumeClassData({ commit, dispatch }, payload) {
    const { learnRecordId, id } = payload
    let _classroom = _.clone(payload)
    _classroom['id'] = learnRecordId
    _classroom['classroomId'] = id
    commit(RESUME_CLASSROOM, _classroom)
    await dispatch('resumeQuiz', { id: learnRecordId })
    await dispatch('uploadLearnRecords')
  },
  async resumeQuiz(
    {
      commit,
      getters: { lessonQuiz, lessonDetail }
    },
    { id }
  ) {
    let learnRecords = await lesson.classrooms
      .learnRecordsById(id)
      .catch(e => console.error(`can't find learnRecords`))
    if (learnRecords && learnRecords.extra.quiz) {
      let quiz = _.get(learnRecords, 'extra.quiz', lessonQuiz)
      let _lessonDetail = _.clone(lessonDetail)
      _lessonDetail.quiz = quiz
      let filterQuiz = _.filter(quiz, ({ answer }) => answer)
      _.forEach(_lessonDetail.modList, q => {
        if (q.cmd === 'Quiz') {
          let quiz = _.find(filterQuiz, o => o.key === q.data.quiz.data[0].id)
          if (quiz) {
            q.state = { result: quiz.result, answer: quiz.answer }
          }
        }
      })
      commit(RESUME_QUIZ, _lessonDetail)
    }
  },
  async doQuiz(
    {
      commit,
      getters: { lessonDetail }
    },
    { key, result, answer }
  ) {
    let _lessonDetail = _.clone(lessonDetail)
    let index = _.findIndex(_lessonDetail.quiz, o => o.key === key)
    _lessonDetail.quiz[index].result = result
    _lessonDetail.quiz[index].answer = answer
    commit(DO_QUIZ, _lessonDetail)
  },
  async createLearnRecords(
    {
      commit,
      getters: { learnRecords, lessonUserId }
    },
    { packageId, lessonId, state = 0 }
  ) {
    let res = await lesson.users
      .createLearnRecords({
        packageId,
        lessonId,
        state,
        extra: learnRecords
      })
      .catch(e => console.error(e))
    if (res) {
      commit(CREATE_LEARN_RECORDS_SUCCESS, res.id)
    }
  },
  async uploadSelfLearnRecords(
    {
      getters: { learnRecordsId, learnRecords }
    },
    { packageId, lessonId, state = 0 }
  ) {
    learnRecordsId &&
      (await lesson.users
        .uploadSelfLearnRecords(learnRecordsId, {
          packageId,
          lessonId,
          state,
          extra: learnRecords
        })
        .catch(e => console.error(e)))
  },
  async uploadLearnRecords(context, state = 0) {
    const {
      getters: { classId, learnRecords }
    } = context
    const { username, name } = learnRecords
    if (username && name) {
      await lesson.classrooms.uploadLearnRecords({
        classId,
        learnRecords,
        state
      })
    }
  },
  async clearLearnRecordsId({ commit }) {
    commit(CLEAR_LEARN_RECORDS_ID)
  },
  async clearLessonData({ commit }) {
    commit(CLEAR_LESSON_DATA)
  },
  async switchSummary({ commit }, flag) {
    commit(SWITCH_SUMMARY, flag)
  },
  async setEnterClassID({ commit }, { key }) {
    commit(SET_ENTER_CLASS_ID, {
      key
    })
  },
  async leaveTheClass({ commit, dispatch }) {
    await lesson.classrooms.leave()
    await dispatch('lesson/getUserDetail', null, { root: true })
    commit(LEAVE_THE_CLASS)
  },
  async checkClassroom({ commit, dispatch }) {
    await lesson.classrooms.currentClass().catch(e => {
      commit(LEAVE_THE_CLASS)
      return Promise.reject(e)
    })
  },
  async changeStatus({ commit }, payload) {
    commit(CHANGE_STATUS, payload)
  },
  async switchDevice({ commit }, payload) {
    commit(SWITCH_DEVICE, payload)
  }
}
export default actions
