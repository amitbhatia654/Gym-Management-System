const express = require('express');
const router = express.Router()
const gymController = require('../Controller/gym-controller');
const AuthMiddleWare = require('../auth-middleware');


router.route('/member').post(AuthMiddleWare, gymController.addMember)
router.route('/member').get(AuthMiddleWare, gymController.getAllJoinedMembers)
router.route('/member').put(AuthMiddleWare, gymController.updateMember)
router.route('/member').delete(AuthMiddleWare, gymController.deleteMember)
router.route('/member-report').get(AuthMiddleWare, gymController.getMembersReport)

router.route('/trainer').post(AuthMiddleWare, gymController.addTrainer)
router.route('/trainer').get(AuthMiddleWare, gymController.getAllTrainers)
router.route('/trainer').put(AuthMiddleWare, gymController.updateTrainer)
router.route('/trainer').delete(AuthMiddleWare, gymController.deleteTrainer)

router.route('/trainers-list').get(AuthMiddleWare, gymController.getAllTrainersList)
router.route('/getMemberList/:id').get(AuthMiddleWare, gymController.getAllMembersList)








module.exports = router;