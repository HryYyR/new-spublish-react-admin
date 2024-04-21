import { get, post } from '../axios'

export function login(data) {
   return post('login', data)
}

export function getAuthorityList() {
   return post('getAuthorityList')
}

export function deleteAssignAuthority(id) {
   return post('deleteAssignAuthority', { id: id })
}

export function addAssignAuthority(data) {
   return post('addAssignAuthority', data)
}

export function changeAssignAuthorityUse(data) {
   return post('changeAuthorityUse', data)
}

export function getRoleList() {
   return post('getRoleList')
}

export function deleteAssignRole(id) {
   return post('deleteAssignRole', { id: id })
}

export function changeRoleAuthorityList(id, list) {
   let List = JSON.stringify(list)
   return post('changeRoleAuthorityList', { id: id, list: List })
}

export function AddRole(data) {
   data.rightList = JSON.stringify(data.rightList)
   data.use = data.use ? '1' : '2'
   return post('AddRole', data)
}


export function getUserInfo() {
   return post('getUserInfo')

}

export function addUser(NewUserData) {
   return post('addUser', NewUserData)
}

export function deleteAssignUser(key) {
   return post('deleteAssignUser', { key: key })
}

export function getRegions() {
   return post('getRegion')
}

export function getAssignUserData(key){
   return post('getAssignUserData',{key:key})
}

export function updateAssignUser(data){
   return post('updateAssignUser',data)
}


export function addNews(newsData) {
   return post('addNews', newsData)
}