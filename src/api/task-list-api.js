const API_BASE = 'http://www.kevin-zhang.cn:8080/task-list-web-1.0-SNAPSHOT'

const API_BASE_TASK_LIST = API_BASE + '/taskList'

export const GET_NON_FINISH_TASK = API_BASE_TASK_LIST + '/selectNonFinish'

export const GET_FINISHED_TASK = API_BASE_TASK_LIST + '/selectFinished'

export const DONE = API_BASE_TASK_LIST + '/done'

export const SAVE = API_BASE_TASK_LIST + '/saveUpdate'

export const QUERY = API_BASE_TASK_LIST + '/query'

export const QUERY_LABELS = API_BASE_TASK_LIST + '/getLabels'