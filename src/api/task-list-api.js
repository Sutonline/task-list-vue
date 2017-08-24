const API_BASE = 'http://www.kevin-zhang.cn:8080/task-list-web-1.0-SNAPSHOT'

const API_BASE_TASK_LIST = API_BASE + '/taskList'

const API_BASE_LOGIN = API_BASE + '/loginRest'

export const GET_NON_FINISH_TASK = API_BASE_TASK_LIST + '/selectNonFinish'

export const GET_FINISHED_TASK = API_BASE_TASK_LIST + '/selectFinished'

export const DONE = API_BASE_TASK_LIST + '/done'

export const SAVE = API_BASE_TASK_LIST + '/saveUpdate'

export const QUERY = API_BASE_TASK_LIST + '/query'

export const QUERY_LABELS = API_BASE_TASK_LIST + '/getLabels'

export const LIST_BY_PAGE = API_BASE_TASK_LIST + '/listByPage'

export const LOGIN = API_BASE_LOGIN + '/login'

export const LIST_ACTIVITIES = API_BASE_TASK_LIST + '/listActivities'

export const SAVE_ACTIVITY = API_BASE_TASK_LIST + '/saveActivity'

export const DELETE_ACTIVITY = API_BASE_TASK_LIST + '/deleteActivity'

export const SAVE_NODE = API_BASE_TASK_LIST + '/saveNode'

export const COMPLETE_NODE = API_BASE_TASK_LIST + '/completeNode'

export const UPDATE_ACTIVITY = API_BASE_TASK_LIST + '/updateActivity'

export const UPDATE_ACTIVITY_NODE = API_BASE_TASK_LIST + '/updateActivityNode'

export const GET_ACTIVITY_NODES = API_BASE_TASK_LIST + '/getActivityAndNodes'
