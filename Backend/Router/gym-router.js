const express = require('express');
const router = express.Router()
const gymController = require('../Controller/gym-controller');
const AuthMiddleWare = require('../auth-middleware');


router.route('/member').post(AuthMiddleWare, gymController.addMember)
router.route('/member').get(AuthMiddleWare, gymController.getAllJoinedMembers)
router.route('/member').put(AuthMiddleWare, gymController.updateMember)
router.route('/member').delete(AuthMiddleWare, gymController.deleteMember)
router.route('/member-report').get(AuthMiddleWare, gymController.getMembersReport)







module.exports = router;