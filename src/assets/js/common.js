/**
 * 删除所有cookie
 * @param {Object} self  vue实例
 */
function delAllCookies(self) {
	self.delCookie('username');
	self.delCookie('token');
}

export {
	delAllCookies
}