const express = require('express');
const router = express.Router()
const gymController = require('../Controller/gym-controller');
const AuthMiddleWare = require('../auth-middleware');



// Members Route
router.route('/member').post(AuthMiddleWare, gymController.addMember)
router.route('/member').get(AuthMiddleWare, gymController.getAllJoinedMembers)
router.route('/member').put(AuthMiddleWare, gymController.updateMember)
router.route('/member').delete(AuthMiddleWare, gymController.deleteMember)
router.route('/member-report').get(AuthMiddleWare, gymController.getMembersReport)

// Trainers Route
router.route('/trainer').post(AuthMiddleWare, gymController.addTrainer)
router.route('/trainer').get(AuthMiddleWare, gymController.getAllTrainers)
router.route('/trainer').put(AuthMiddleWare, gymController.updateTrainer)
router.route('/trainer').delete(AuthMiddleWare, gymController.deleteTrainer)

// List of All Trainers without pagination
router.route('/trainers-list').get(AuthMiddleWare, gymController.getAllTrainersList)
// all members according to trainers
router.route('/getMemberList/:id').get(AuthMiddleWare, gymController.getAllMembersList)

// Membership Plan Route 
router.route('/membershipPlans').post(AuthMiddleWare, gymController.addMembershipPlans)
router.route('/membershipPlans').get(AuthMiddleWare, gymController.getAllMemberPlans)
router.route('/trainer').put(AuthMiddleWare, gymController.updateTrainer)
router.route('/membershipPlans').delete(AuthMiddleWare, gymController.deleteMemberPlan)








module.exports = router;