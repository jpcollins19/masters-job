const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const config = {
  logging: false,
};

if (process.env.LOGGING) {
  delete config.logging;
}

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/masters_testing",
  config
);
const { STRING, UUID, UUIDV4, BOOLEAN, INTEGER } = Sequelize;

const Participant = db.define(`participants`, {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  name: {
    type: STRING,
    defaultValue: null,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  isAdmin: {
    type: BOOLEAN,
    defaultValue: false,
  },
  golfer1: {
    type: STRING,
  },
  golfer2: {
    type: STRING,
  },
  golfer3: {
    type: STRING,
  },
  golfer4: {
    type: STRING,
  },
  golfer5: {
    type: STRING,
  },
  golfer6: {
    type: STRING,
  },
  tiebreaker: {
    type: INTEGER,
    validate: {
      isNumeric: true,
    },
  },
  winningGolfer: {
    type: STRING,
  },
  paid: {
    type: BOOLEAN,
    defaultValue: false,
  },
  tourneyStage: {
    type: STRING,
    defaultValue: "pre",
  },
});

//pre
//commenced
//cut

Participant.addHook("beforeSave", async function (user) {
  if (user._changed.has("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

Participant.byToken = async (token) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await Participant.findByPk(id);
    if (user) {
      return user;
    }
    const error = Error("bad credentials - in byToken - on try");
    error.status = 401;
    throw error;
  } catch (err) {
    console.log("REEEEED", err);
    const error = Error("bad credentials - in byToken on catch");
    error.status = 401;
    throw error;
  }
};

Participant.authenticate = async ({ email, password }) => {
  try {
    const user = await Participant.findOne({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.JWT, {
        expiresIn: 30 * 60,
      });
      return token;
    }
    const error = Error("bad credentials - in authenticate - try");
    error.status = 401;
    throw error;
  } catch (err) {
    console.log("REEED", err);
    const error = Error("bad credentials - in authenticate - catch");
    error.status = 401;
    throw error;
  }
};

const Golfer = db.define(`golfers`, {
  name: {
    type: STRING,
    allowNull: false,
  },
  odds: {
    type: STRING,
  },
  finalScore: {
    type: INTEGER,
    defaultValue: null,
  },
  missedCut: {
    type: BOOLEAN,
    defaultValue: false,
  },
  missedCutNumber: {
    type: INTEGER,
    defaultValue: 99,
  },
  DQ: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

const golferInfo = [
  { name: "Collin Morikawa", odds: "13-1", finalScore: null, missedCut: false },
  { name: "Dustin Johnson", odds: "15-1", finalScore: null, missedCut: false },
  { name: "Sergio Garcia", odds: "15-1", finalScore: null, missedCut: false },
  {
    name: "Francesco Molinari",
    odds: "15-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Jon Rahm", odds: "20-1", finalScore: null, missedCut: false },
  { name: "Brooks Koepka", odds: "20-1", finalScore: null, missedCut: false },
  { name: "Sam Burns", odds: "22-1", finalScore: null, missedCut: false },
  { name: "Abraham Ancer", odds: "25-1", finalScore: null, missedCut: false },
  { name: "Webb Simpson", odds: "25-1", finalScore: null, missedCut: false },
  {
    name: "Scottie Scheffler",
    odds: "25-1",
    finalScore: null,
    missedCut: false,
  },
  {
    name: "Louis Oosthuizen",
    odds: "26-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Jordan Spieth", odds: "27-1", finalScore: null, missedCut: false },
  {
    name: "Xander Schauffele",
    odds: "28-1",
    finalScore: null,
    missedCut: false,
  },
  {
    name: "Hideki Matsuyama",
    odds: "28-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Will Zalatoris", odds: "28-1", finalScore: null, missedCut: false },
  { name: "Harris English", odds: "30-1", finalScore: null, missedCut: false },
  { name: "Patrick Reed", odds: "30-1", finalScore: null, missedCut: false },
  { name: "Paul Casey", odds: "33-1", finalScore: null, missedCut: false },
  { name: "Corey Conners", odds: "33-1", finalScore: null, missedCut: false },
  { name: "Si-Woo Kim", odds: "35-1", finalScore: null, missedCut: false },
  { name: "Adam Scott", odds: "40-1", finalScore: null, missedCut: false },
  {
    name: "Cameron Tringale",
    odds: "40-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Matthew Wolff", odds: "45-1", finalScore: null, missedCut: false },
  { name: "Jason Kokrak", odds: "45-1", finalScore: null, missedCut: false },
  { name: "Joaquin Niemann", odds: "45-1", finalScore: null, missedCut: false },
  { name: "Erik Van Rooyen", odds: "45-1", finalScore: null, missedCut: false },
  {
    name: "Maverick McNealy",
    odds: "50-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Mito Pereira", odds: "50-1", finalScore: null, missedCut: false },
  { name: "Russell Henley", odds: "60-1", finalScore: null, missedCut: false },
  { name: "Talor Gooch", odds: "66-1", finalScore: null, missedCut: false },
  { name: "Marc Leishman", odds: "66-1", finalScore: null, missedCut: false },
  { name: "Justin Thomas", odds: "110-1", finalScore: null, missedCut: false },
  { name: "Kevin Na", odds: "140-1", finalScore: null, missedCut: false },
  { name: "Lee Westwood", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Rory McIlroy", odds: "130-1", finalScore: null, missedCut: false },
  { name: "Sungjae Im", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Viktor Hovland", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Ryan Palmer", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Adam Hadwin", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Taylor Moore", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Ian Poulter", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Cameron Davis", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Emiliano Grillo", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Aaron Wise", odds: "80-1", finalScore: null, missedCut: false },
  { name: "Rickie Fowler", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Patton Kizzire", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Carlos Ortiz", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Pat Perez", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Doug Ghim", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Luke List", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Stewart Cink", odds: "100-1", finalScore: null, missedCut: false },
  {
    name: "Sebastian Munoz",
    odds: "100-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Seamus Power", odds: "100-1", finalScore: null, missedCut: false },
  {
    name: "Kyoung-Hoon Lee",
    odds: "100-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Chad Ramey", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Kevin Kisner", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Lanto Griffin", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Denny McCarthy", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Danny Willett", odds: "100-1", finalScore: null, missedCut: false },
  { name: "Joel Dahmen", odds: "100-1", finalScore: null, missedCut: false },
  {
    name: "Sahith Theegala",
    odds: "100-1",
    finalScore: null,
    missedCut: false,
  },
  {
    name: "Henrik Norlander",
    odds: "100-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Lucas Glover", odds: "100-1", finalScore: null, missedCut: false },
  {
    name: "Charl Schwartzel",
    odds: "125-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Garrick Higgo", odds: "125-1", finalScore: null, missedCut: false },
  { name: "Roger Sloan", odds: "125-1", finalScore: null, missedCut: false },
  { name: "Russell Knox", odds: "125-1", finalScore: null, missedCut: false },
  {
    name: "Joseph Bramlett",
    odds: "125-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Cameron Young", odds: "125-1", finalScore: null, missedCut: false },
  {
    name: "Rasmus Hojgaard",
    odds: "125-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Ryan Moore", odds: "125-1", finalScore: null, missedCut: false },
  { name: "Stephan Jaeger", odds: "125-1", finalScore: null, missedCut: false },
  {
    name: "Scott Stallings",
    odds: "150-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Tom Hoge", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Hayden Buckley", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Brendan Steele", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Martin Laird", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Harry Higgs", odds: "150-1", finalScore: null, missedCut: false },
  {
    name: "Brandt Snedeker",
    odds: "150-1",
    finalScore: null,
    missedCut: false,
  },
  {
    name: "Dylan Frittelli",
    odds: "150-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Seth Reeves", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Chez Reavie", odds: "150-1", finalScore: null, missedCut: false },
  {
    name: "Hudson Swafford",
    odds: "150-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Adam Schenk", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Kyle Stanley", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Troy Merritt", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Scott Piercy", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Brendon Todd", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Matt Kuchar", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Charles Howell", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Nick Watney", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Matt Jones", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Zach Johnson", odds: "150-1", finalScore: null, missedCut: false },
  { name: "Mark Hubbard", odds: "175-1", finalScore: null, missedCut: false },
  { name: "Chesson Hadley", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Chun-An Yu", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Keith Mitchell", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Matt Wallace", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Sam Ryder", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Peter Malnati", odds: "200-1", finalScore: null, missedCut: false },
  { name: "James Hahn", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Nick Taylor", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Sepp Straka", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Robert Streb", odds: "200-1", finalScore: null, missedCut: false },
  {
    name: "Matthew NeSmith",
    odds: "200-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Nate Lashley", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Rory Sabbatini", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Brian Stuard", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Greyson Sigg", odds: "200-1", finalScore: null, missedCut: false },
  {
    name: "Michael Thompson",
    odds: "200-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Doc Redman", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Kevin Tway", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Aaron Rai", odds: "200-1", finalScore: null, missedCut: false },
  { name: "Davis Riley", odds: "250-1", finalScore: null, missedCut: false },
  { name: "Adam Svensson", odds: "250-1", finalScore: null, missedCut: false },
  { name: "Hank Lebioda", odds: "250-1", finalScore: null, missedCut: false },
  {
    name: "Bronson Burgoon",
    odds: "250-1",
    finalScore: null,
    missedCut: false,
  },
  { name: "Wyndham Clark", odds: "250-1", finalScore: null, missedCut: false },
  { name: "Trey Mullinax", odds: "250-1", finalScore: null, missedCut: false },
  { name: "J.T. Poston", odds: "250-1", finalScore: null, missedCut: false },
  { name: "Brandon Hagy", odds: "250-1", finalScore: null, missedCut: false },
  { name: "Brice Garnett", odds: "250-1", finalScore: null, missedCut: false },
  { name: "Andrew Landry", odds: "250-1", finalScore: null, missedCut: false },
  { name: "Andrew Putnam", odds: "250-1", finalScore: null, missedCut: false },
];

const syncAndSeed = async () => {
  await db.sync({ force: true });
  /////////////////////////////////////////////////////////////
  const [
    Collin_Morikawa,
    Dustin_Johnson,
    Sergio_Garcia,
    Francesco_Molinari,
    Jon_Rahm,
    Brooks_Koepka,
    Sam_Burns,
    Abraham_Ancer,
    Webb_Simpson,
    Scottie_Scheffler,
    Louis_Oosthuizen,
    Jordan_Spieth,
    Xander_Schauffele,
    Hideki_Matsuyama,
    Will_Zalatoris,
    Harris_English,
    Patrick_Reed,
    Paul_Casey,
    Corey_Conners,
    Si_Woo_Kim,
    Adam_Scott,
    Cameron_Tringale,
    Matthew_Wolff,
    Jason_Kokrak,
    Joaquin_Niemann,
    Erik_Van_Rooyen,
    Maverick_McNealy,
    Mito_Pereira,
    Russell_Henley,
    Talor_Gooch,
    Marc_Leishman,
    Justin_Thomas,
    Kevin_Na,
    Lee_Westwood,
    Rory_McIlroy,
    Sungjae_Im,
    Viktor_Hovland,
    Ryan_Palmer,
    Adam_Hadwin,
    Taylor_Moore,
    Ian_Poulter,
    Cameron_Davis,
    Emiliano_Grillo,
    Aaron_Wise,
    Rickie_Fowler,
    Patton_Kizzire,
    Carlos_Ortiz,
    Pat_Perez,
    Doug_Ghim,
    Luke_List,
    Stewart_Cink,
    Sebastian_Munoz,
    Seamus_Power,
    Kyoung_Hoon_Lee,
    Chad_Ramey,
    Kevin_Kisner,
    Lanto_Griffin,
    Denny_McCarthy,
    Danny_Willett,
    Joel_Dahmen,
    Sahith_Theegala,
    Henrik_Norlander,
    Lucas_Glover,
    Charl_Schwartzel,
    Garrick_Higgo,
    Roger_Sloan,
    Russell_Knox,
    Joseph_Bramlett,
    Cameron_Young,
    Rasmus_Hojgaard,
    Ryan_Moore,
    Stephan_Jaeger,
    Scott_Stallings,
    Tom_Hoge,
    Hayden_Buckley,
    Brendan_Steele,
    Martin_Laird,
    Harry_Higgs,
    Brandt_Snedeker,
    Dylan_Frittelli,
    Seth_Reeves,
    Chez_Reavie,
    Hudson_Swafford,
    Adam_Schenk,
    Kyle_Stanley,
    Troy_Merritt,
    Scott_Piercy,
    Brendon_Todd,
    Matt_Kuchar,
    Charles_Howell,
    Nick_Watney,
    Matt_Jones,
    Zach_Johnson,
    Mark_Hubbard,
    Chesson_Hadley,
    Chun_An_Yu,
    Keith_Mitchell,
    Matt_Wallace,
    Sam_Ryder,
    Peter_Malnati,
    James_Hahn,
    Nick_Taylor,
    Sepp_Straka,
    Robert_Streb,
    Matthew_NeSmith,
    Nate_Lashley,
    Rory_Sabbatini,
    Brian_Stuard,
    Greyson_Sigg,
    Michael_Thompson,
    Doc_Redman,
    Kevin_Tway,
    Aaron_Rai,
    Davis_Riley,
    Adam_Svensson,
    Hank_Lebioda,
    Bronson_Burgoon,
    Wyndham_Clark,
    Trey_Mullinax,
    JT_Poston,
    Brandon_Hagy,
    Brice_Garnett,
    Andrew_Landry,
    Andrew_Putnam,
  ] = await Promise.all(
    golferInfo.map((obj) =>
      Golfer.create({
        name: obj.name,
        odds: obj.odds,
        finalScore: obj.finalScore,
        missedCut: obj.missedCut,
      })
    )
  );
  /////////////////////////////////////////////////////////
  const Joe = await Participant.create({
    email: "joe@gmail.com",
    password: "joe_pw",
    name: "Joe",
    isAdmin: true,
    golfer1: "Collin Morikawa",
    golfer2: "Dustin Johnson",
    golfer3: "Xander Schauffele",
    golfer4: "Jordan Spieth",
    golfer5: "Justin Thomas",
    golfer6: "Rory McIlroy",
    tiebreaker: -10,
    winningGolfer: "Xander Schauffele",
  });
  const Dalton = await Participant.create({
    email: "dalton@gmail.com",
    password: "dalton_pw",
    name: "Dalton",
    isAdmin: false,
    golfer1: "Dustin Johnson",
    golfer2: "Sam Burns",
    golfer3: "Jordan Spieth",
    golfer4: "Louis Oosthuizen",
    golfer5: "Sungjae Im",
    golfer6: "Cameron Davis",
    tiebreaker: -5,
    winningGolfer: "Dustin Johnson",
  });
  const Hoov = await Participant.create({
    email: "hoov@gmail.com",
    password: "hoov_pw",
    name: "Hoov",
    isAdmin: false,
    golfer1: "Dustin Johnson",
    golfer2: "Sam Burns",
    golfer3: "Jordan Spieth",
    golfer4: "Louis Oosthuizen",
    golfer5: "Sungjae Im",
    golfer6: "Cameron Davis",
    tiebreaker: -5,
    winningGolfer: "Dustin Johnson",
  });
  const E = await Participant.create({
    email: "ivaylo@gmail.com",
    password: "ivaylo_pw",
    name: "Ivaylo",
    isAdmin: false,
    golfer1: "Abraham Ancer",
    golfer2: "Scottie Scheffler",
    golfer3: "Paul Casey",
    golfer4: "Will Zalatoris",
    golfer5: "Taylor Moore",
    golfer6: "Joel Dahmen",
    tiebreaker: -15,
    winningGolfer: "Joel Dahmen",
  });
  const Coach = await Participant.create({
    email: "james@gmail.com",
    password: "james_pw",
    name: "James",
    isAdmin: false,
    golfer1: "Collin Morikawa",
    golfer2: "Brooks Koepka",
    golfer3: "Paul Casey",
    golfer4: "Jordan Spieth",
    golfer5: "Kevin Na",
    golfer6: "Lee Westwood",
    tiebreaker: -10,
    winningGolfer: "Paul Casey",
  });
  const Bill = await Participant.create({
    email: "joe1@gmail.com",
    password: "joe1_pw",
    name: "Bill",
    golfer1: "Abraham Ancer",
    golfer2: "Brooks Koepka",
    golfer3: "Paul Casey",
    golfer4: "Corey Conners",
    golfer5: "Kevin Na",
    golfer6: "Adam Hadwin",
    tiebreaker: -5,
    winningGolfer: "Brooks Koepka",
  });
  const Frank = await Participant.create({
    email: "dalton1@gmail.com",
    password: "dalton1_pw",
    name: "Frank",
    isAdmin: false,
    golfer1: "Dustin Johnson",
    golfer2: "Sam Burns",
    golfer3: "Corey Conners",
    golfer4: "Louis Oosthuizen",
    golfer5: "Sungjae Im",
    golfer6: "Adam Hadwin",
    tiebreaker: -7,
    winningGolfer: "Adam Hadwin",
  });
  const John = await Participant.create({
    email: "hoov1@gmail.com",
    password: "hoov1_pw",
    name: "John",
    isAdmin: false,
    golfer1: "Dustin Johnson",
    golfer2: "Scottie Scheffler",
    golfer3: "Jordan Spieth",
    golfer4: "Louis Oosthuizen",
    golfer5: "Sungjae Im",
    golfer6: "Taylor Moore",
    tiebreaker: -5,
    winningGolfer: "Dustin Johnson",
  });
  const Brandon = await Participant.create({
    email: "ivaylo1@gmail.com",
    password: "ivaylo1_pw",
    name: "Brandon",
    isAdmin: false,
    golfer1: "Collin Morikawa",
    golfer2: "Francesco Molinari",
    golfer3: "Paul Casey",
    golfer4: "Will Zalatoris",
    golfer5: "Kevin Na",
    golfer6: "Joel Dahmen",
    tiebreaker: null,
    winningGolfer: null,
  });
  const Jake = await Participant.create({
    email: "james1@gmail.com",
    password: "james1_pw",
    name: "Jake",
    isAdmin: false,
    golfer1: "Francesco Molinari",
    golfer2: "Brooks Koepka",
    golfer3: "Paul Casey",
    golfer4: "Will Zalatoris",
    golfer5: "Kevin Na",
    golfer6: "Lee Westwood",
    tiebreaker: -10,
    winningGolfer: "Paul Casey",
  });
  /////////////////////////////////////////////////////////////
  //once tourney commences:
  ///////////////////////////////////////////////////////////////////
  // const Collin_Morikawa = await Golfer.findOne({
  //   where: { name: "Collin Morikawa" },
  // });

  // const Dustin_Johnson = await Golfer.findOne({
  //   where: { name: "Dustin Johnson" },
  // });

  // const Xander_Schauffele = await Golfer.findOne({
  //   where: { name: "Xander Schauffele" },
  // });

  // const Jordan_Spieth = await Golfer.findOne({
  //   where: { name: "Jordan Spieth" },
  // });

  // const Justin_Thomas = await Golfer.findOne({
  //   where: { name: "Justin Thomas" },
  // });

  // const Rory_McIlroy = await Golfer.findOne({
  //   where: { name: "Rory McIlroy" },
  // });

  // const Sam_Burns = await Golfer.findOne({
  //   where: { name: "Sam Burns" },
  // });

  // const Louis_Oosthuizen = await Golfer.findOne({
  //   where: { name: "Louis Oosthuizen" },
  // });

  // const Sungjae_Im = await Golfer.findOne({
  //   where: { name: "Sungjae Im" },
  // });

  // const Cameron_Davis = await Golfer.findOne({
  //   where: { name: "Cameron Davis" },
  // });

  // const Abraham_Ancer = await Golfer.findOne({
  //   where: { name: "Abraham Ancer" },
  // });

  // const Scottie_Scheffler = await Golfer.findOne({
  //   where: { name: "Scottie Scheffler" },
  // });

  // const Paul_Casey = await Golfer.findOne({
  //   where: { name: "Paul Casey" },
  // });

  // const Will_Zalatoris = await Golfer.findOne({
  //   where: { name: "Will Zalatoris" },
  // });

  // const Taylor_Moore = await Golfer.findOne({
  //   where: { name: "Taylor Moore" },
  // });

  // const Joel_Dahmen = await Golfer.findOne({
  //   where: { name: "Joel Dahmen" },
  // });

  // const Brooks_Koepka = await Golfer.findOne({
  //   where: { name: "Brooks Koepka" },
  // });

  // const Kevin_Na = await Golfer.findOne({
  //   where: { name: "Kevin Na" },
  // });

  // const Lee_Westwood = await Golfer.findOne({
  //   where: { name: "Lee Westwood" },
  // });

  // const Corey_Conners = await Golfer.findOne({
  //   where: { name: "Corey Conners" },
  // });

  // const Adam_Hadwin = await Golfer.findOne({
  //   where: { name: "Adam Hadwin" },
  // });

  // const Francesco_Molinari = await Golfer.findOne({
  //   where: { name: "Francesco Molinari" },
  // });

  // Collin_Morikawa.finalScore = -1;
  // Dustin_Johnson.finalScore = -2;
  // Xander_Schauffele.finalScore = 3;
  // Jordan_Spieth.finalScore = 8;
  // Justin_Thomas.finalScore = -12;
  // Rory_McIlroy.finalScore = -6;
  // Sam_Burns.finalScore = -6;
  // Louis_Oosthuizen.finalScore = -7;
  // Sungjae_Im.finalScore = -8;
  // Cameron_Davis.finalScore = -1;
  // Abraham_Ancer.finalScore = 0;
  // Scottie_Scheffler.finalScore = 9;
  // Paul_Casey.finalScore = 5;
  // Will_Zalatoris.finalScore = 3;
  // Taylor_Moore.finalScore = 1;
  // Joel_Dahmen.finalScore = 4;
  // Brooks_Koepka.finalScore = -3;
  // Kevin_Na.finalScore = -6;
  // Lee_Westwood.finalScore = -8;
  // Corey_Conners.finalScore = -10;
  // Adam_Hadwin.finalScore = -2;
  // Francesco_Molinari.finalScore = 2;

  // ///////////////////////////////////////////////////////////////
  //post cut
  // Collin_Morikawa.missedCutNumber = 3;
  // Dustin_Johnson.missedCutNumber = 3;
  // Xander_Schauffele.missedCutNumber = 3;
  // Jordan_Spieth.missedCutNumber = 3;
  // Justin_Thomas.missedCutNumber = 3;
  // Rory_McIlroy.missedCutNumber = 3;
  // Sam_Burns.missedCutNumber = 3;
  // Louis_Oosthuizen.missedCutNumber = 3;
  // Sungjae_Im.missedCutNumber = 3;
  // Cameron_Davis.missedCutNumber = 3;
  // Abraham_Ancer.missedCutNumber = 3;
  // Scottie_Scheffler.missedCutNumber = 3;
  // Paul_Casey.missedCutNumber = 3;
  // Will_Zalatoris.missedCutNumber = 3;
  // Taylor_Moore.missedCutNumber = 3;
  // Joel_Dahmen.missedCutNumber = 3;
  // Brooks_Koepka.missedCutNumber = 3;
  // Kevin_Na.missedCutNumber = 3;
  // Lee_Westwood.missedCutNumber = 3;
  // Corey_Conners.missedCutNumber = 3;
  // Adam_Hadwin.missedCutNumber = 3;
  // Francesco_Molinari.missedCutNumber = 3;
  //missed cut golfer assignment
  // Justin_Thomas.missedCut = true;
  // Sungjae_Im.missedCut = true;
  // Taylor_Moore.missedCut = true;
  // Kevin_Na.missedCut = true;
  // Lee_Westwood.QG = true;
  // ///////////////////////////////////////////////////////////////
  // await Promise.all([
  //   Collin_Morikawa.save(),
  //   Dustin_Johnson.save(),
  //   Xander_Schauffele.save(),
  //   Jordan_Spieth.save(),
  //   Justin_Thomas.save(),
  //   Rory_McIlroy.save(),
  //   Sam_Burns.save(),
  //   Louis_Oosthuizen.save(),
  //   Sungjae_Im.save(),
  //   Cameron_Davis.save(),
  //   Abraham_Ancer.save(),
  //   Scottie_Scheffler.save(),
  //   Paul_Casey.save(),
  //   Will_Zalatoris.save(),
  //   Taylor_Moore.save(),
  //   Joel_Dahmen.save(),
  //   Brooks_Koepka.save(),
  //   Kevin_Na.save(),
  //   Lee_Westwood.save(),
  //   Corey_Conners.save(),
  //   Adam_Hadwin.save(),
  //   Francesco_Molinari.save(),
  // ]);
};

module.exports = {
  models: { Participant, Golfer },
  syncAndSeed,
};
