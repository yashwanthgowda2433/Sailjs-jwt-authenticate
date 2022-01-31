/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Excel = require('exceljs');
const db = sails.getDatastore().manager;

module.exports = {
	home: function (req, res) {
		return res.view('pages/home')
	},

	welcome: async function (req, res) {
		// var users = await User.find()
		var users = await User.find().populate('login',{
			  limit: 1,
			  sort: 'logintime DESC'
		});
		var images = await Images.find();
		return res.view('pages/welcome',{app: users, img: images, controller:this})
	},

	today: async function (req, res) {
		var date = new Date().toISOString().replace('T', ' ').substring(0, 10)

		var users = await User.find().populate('login',{
			where: {
				'logintime':{
					'>=': date
				}
			},
			  sort: 'logintime DESC'
		});
		// console.log(users)
		var images = await Images.find();
		return res.view('pages/today',{app: users, img: images, controller:this})
	},

	weekly: async function (req, res) {
		var date = new Date().toISOString().replace('T', ' ').substring(0, 10)
		var currentDate = new Date();
		var today = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay())).toISOString().replace('T', ' ').substring(0, 10)
		var last7day = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() - 7)).toISOString().replace('T', ' ').substring(0, 10)
		console.log(today, last7day)
		var users = await User.find().populate('login',{
			where: {
				'logintime':{
					'<=': today
				},
				'logintime':{
					'>=': last7day
				}
			},
			  sort: 'logintime DESC'
		});
		// console.log(users)
		var images = await Images.find();
		return res.view('pages/weekly',{app: users, img: images, controller:this})
	},

	login: function(req, res) {
		if (req.user) return res.redirect('/welcome')
		return res.view('pages/homepage')
	},

	logout: function(req, res) {
		res.clearCookie('sailsjwt',{
			signed: true,
			maxAge: 24 * 60 * 60 * 1000
		});
		return res.redirect('/')
	},

	signup: function(req, res) {
		if (req.user) return res.redirect('/welcome')
		return res.view('pages/signup')
	},

	profile: function(req, res) {
		return res.view('pages/profile')
	},

	export: async function(req, res) {
		var articles = await Table.find();
		
		
		var workbook = new Excel.Workbook();

	workbook.creator = 'Me';
	workbook.lastModifiedBy = 'Her';
	workbook.created = new Date();
	workbook.modified = new Date();
	workbook.lastPrinted = new Date();
	workbook.properties.date1904 = true;

	workbook.views = [
		{
			x: 0, y: 0, width: 10000, height: 20000,
			firstSheet: 0, activeTab: 1, visibility: 'visible'
		}
	];
	var worksheet = workbook.addWorksheet('My Sheet');
	worksheet.columns = [
		{ header: 'Id', key: 'id', width: 10 },
		{ header: 'Name', key: 'name', width: 32 },
		{ header: 'Description', key: 'description', width: 32 },
		{ header: 'Created ON', key: 'created', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date()] },
		{ header: 'Modified ON', key: 'modified', width: 10, outlineLevel: 1, type: 'date', formulae: [new Date()] }

	];
	var i=1;
	articles.forEach(function(text){
		
		worksheet.addRow({ id: i, name: text.title, description: text.description, created: new Date(text.createdAt), modified:new Date(text.updatedAt) });
		i++;
	});

	res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
	workbook.xlsx.write(res)
		.then(function (data) {
			res.end();
			console.log('File write done........');
		});
	}
}
