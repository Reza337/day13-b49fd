const express = require("express");
const app = express();
const PORT = 5000;
const path = require("path");

// setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// set serving static file
app.use(express.static(path.join(__dirname, "src/assets")));
// set serving static file specific
app.use(express.static(path.join(__dirname, "src/assets/images")));

// parsing data
app.use(express.urlencoded({ extended: false }));

// sequalize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

// dummy data
// const dataBlog = [
// 	{
// 		title: "Dumbways Mobile App - 2021",
// 		content:
// 			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
// 		images: "/images/project.jpeg",
// 		startDate: "2023-08-01",
// 		endDate: "2023-09-01",
// 		duration: "3 Bulan",
// 		nodejs: true,
// 		reactjs: true,
// 		nextjs: true,
// 		typescript: true,
// 	},
// 	{
// 		title: "Dumbways Mobile App - 2021",
// 		content:
// 			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
// 		images: "/images/project.jpeg",
// 		startDate: "2023-08-01",
// 		endDate: "2023-09-01",
// 		duration: "3 Bulan",
// 		nodejs: true,
// 		reactjs: true,
// 		nextjs: true,
// 		typescript: true,
// 	},
// 	{
// 		title: "Dumbways Mobile App - 2021",
// 		content:
// 			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
// 		images: "/images/project.jpeg",
// 		startDate: "2023-08-01",
// 		endDate: "2023-09-01",
// 		duration: "3 Bulan",
// 		nodejs: true,
// 		reactjs: true,
// 		nextjs: true,
// 		typescript: true,
// 	},
// 	{
// 		title: "Dumbways Mobile App - 2021",
// 		content:
// 			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
// 		images: "/images/project.jpeg",
// 		startDate: "2023-08-01",
// 		endDate: "2023-09-01",
// 		duration: "3 Bulan",
// 		nodejs: true,
// 		reactjs: true,
// 		nextjs: true,
// 		typescript: true,
// 	},
// 	{
// 		title: "Dumbways Mobile App - 2021",
// 		content:
// 			"App that used for dumbways student, it was deployed and can downloaded on playstore. Happy download",
// 		images: "/images/project.jpeg",
// 		startDate: "2023-08-01",
// 		endDate: "2023-09-01",
// 		duration: "3 Bulan",
// 		nodejs: true,
// 		reactjs: true,
// 		nextjs: true,
// 		typescript: true,
// 	},
// ];

// routing
app.get("/", home);
app.get("/blog", blog);
app.post("/blog", addBlog);
app.get("/blog-detail/:id", blogDetail);
app.get("/contact", contactMe);
app.get("/delete-blog/:id", deleteBlog);
app.get("/edit-blog/:id", editBlog);
app.post("/update-blog/:id", updateBlog);

// local server
app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

// module.exports = app;

// index
async function home(req, res) {
	try {
		const query = `SELECT id, name, start_date, end_date, description, technologies, image FROM public.projects;`;
		let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

		const data = obj.map((res) => ({
			...res,
			technologies: {
				nodejs: true,
				reactjs: false,
				nextjs: true,
				typescript: true,
			},
		}));

		console.log(data);
		res.render("index", { dataBlog: data });
	} catch (err) {
		console.log(err);
	}
}

// blog
function blog(req, res) {
	res.render("blog");
}

// add a new blog
function addBlog(req, res) {
	const {
		title,
		start_date,
		end_date,
		content,
		images,
		nodejs,
		reactjs,
		nextjs,
		typescript,
	} = req.body;

	let start = new Date(start_date);
	let end = new Date(end_date);

	if (start > end) {
		return console.log("You Fill End Date Before Start Date");
	}

	let difference = end.getTime() - start.getTime();
	let days = difference / (1000 * 3600 * 24);
	let weeks = Math.floor(days / 7);
	let months = Math.floor(weeks / 4);
	let years = Math.floor(months / 12);
	let duration = "";

	if (days > 0) {
		duration = days + " Hari";
	}
	if (weeks > 0) {
		duration = weeks + " Minggu";
	}
	if (months > 0) {
		duration = months + " Bulan";
	}
	if (years > 0) {
		duration = years + " Tahun";
	}

	const data = {
		title,
		content,
		images,
		startDate,
		endDate,
		duration,
		nodejs,
		reactjs,
		nextjs,
		typescript,
	};

	dataBlog.push(data);
	res.redirect("/");
}

// edit blog
function editBlog(req, res) {
	const id = parseInt(req.params.id);
	res.render("edit-blog", { blog: dataBlog[id], blogIndex: id });
}

// update blog
function updateBlog(req, res) {
	const blogIndex = parseInt(req.body.blogIndex);
	const {
		name,
		start_date,
		end_date,
		desciption,
		image,
		nodejs,
		reactjs,
		nextjs,
		typescript,
	} = req.body;

	let start = new Date(start_date);
	let end = new Date(end_date);

	if (start > end) {
		return console.log("You Fill End Date Before Start Date");
	}

	let difference = end.getTime() - start.getTime();
	let days = difference / (1000 * 3600 * 24);
	let weeks = Math.floor(days / 7);
	let months = Math.floor(weeks / 4);
	let years = Math.floor(months / 12);
	let duration = "";

	if (days > 0) {
		duration = days + " Hari";
	}
	if (weeks > 0) {
		duration = weeks + " Minggu";
	}
	if (months > 0) {
		duration = months + " Bulan";
	}
	if (years > 0) {
		duration = years + " Tahun";
	}

	dataBlog[blogIndex].name = name;
	dataBlog[blogIndex].start_date = start_date;
	dataBlog[blogIndex].end_date = end_date;
	dataBlog[blogIndex].desciption = desciption;
	dataBlog[blogIndex].image = image;
	dataBlog[blogIndex].duration = duration;
	dataBlog[blogIndex].nodejs = nodejs;
	dataBlog[blogIndex].reactjs = reactjs;
	dataBlog[blogIndex].nextjs = nextjs;
	dataBlog[blogIndex].typescript = typescript;

	res.redirect("/");
}

// blog detail
function blogDetail(req, res) {
	const { id } = req.params;

	res.render("blog-detail", { blog: dataBlog[id] });
}

// contact me
function contactMe(req, res) {
	res.render("contact");
}

// Delete blog
function deleteBlog(req, res) {
	const { id } = req.params;

	dataBlog.splice(id, 1);
	res.redirect("/");
}
