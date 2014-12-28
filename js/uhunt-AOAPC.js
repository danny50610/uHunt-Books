angular.module('uHunt.AOAPC', ['uHunt.base'])

.value('AOAPC_1ed', [
  {title:'Getting Started', arr:
  [{title:'Getting Started', arr:[
    ['',10055,10071,10300,458,494,414,490,445,488,489,694,457]
   ]}
  ]},

  {title:'Elementary Problem Solving', arr:
  [{title:'String', arr:[
    ['',401,10010,10361,537,409,10878,10815,644,10115]
   ]},
   {title:'Big Number', arr:[
    ['',424,10106,465,748,10494]
   ]},
   {title:'Sorting/Searching', arr:[
    ['',340,10420,10474,152,299,120,156,400,123,10194,755,10785]
   ]},
   {title:'Maths', arr:[
    ['Misc',113,10161,253,621,10025,591,107,573,846,10499,10790,11044,10719,10177,10916,10970,10014],
    ['Number Theory',575,10110,550,568,408,350,10061,10392,10879],
    ['Simple Geometry',10250,579,375,10387,10112]
   ]}
  ]},

  {title:'Data Structures', arr:
  [{title:'Lists', arr:[
    ['',127,101,133,10152,673,442,11111,11234,540,10050]
   ]},
   {title:'Binary Trees', arr:[
    ['',112,548,297,712,699,327,839,10562]
   ]},
   {title:'Graphs', arr:[
    ['',572,657,784,705,439,532,10557,10047,10004,10129,10054,10596,10305,196]
   ]}
  ]},

  {title:'Brute Force', arr:
  [{title:'Elementary Skills', arr:[
    ['',10167,11205,131,146,10098,729,592,110]
   ]},
   {title:'Backtracking', arr:[
    ['Easy',10474,216,639,539,301,10344,331,10012,165,167,10001,140,193,208],
    ['Hard',10123,10160,197,185,307,317,387,519,529,565,502,322]
   ]},
   {title:'Implicit Graph Traversal', arr:[
    ['',10603,10422,10085,310,321,704]
   ]},
   {title:'Hashing / Sets', arr:[
    ['',188,10282,10391,10125,10887,141,10591]
   ]},
   {title:"Rujia Liu's Problems for Beginners", arr:[
    ['',11218,11198,10274,11210,10624]
   ]}
  ]},

  {title:'Algorithm Design', arr:
  [{title:'', arr:[
    ['',10905,10763,10132,270,10341,10057,10706,10487,10340,10700,10026,311,10020,10714,10954,714,10602,10400,10718,11054,10382,10670,10720,993,10716,11100,10245,11129,10041,507,108,10827,757,10148]
   ]}
  ]},

  {title:'Dynamic Programming', arr:
  [{title:'', arr:[
    ['',111,103,10405,674,10003,116,10131,10066,10192,147,357,562,348,624,10130,531,10465,10285,437,10404,620,825,10069,10534,10051,10651,590,10306,10739,10304,10271,10617,11137,10154,10201,10453,10029,10313,10401,10891,11151,10911,10635,10564,662,10626,10118,607,10604,10913,11008,10723,11258,10599,10817,10163,709,10280,10558,11081]
   ]}
  ]},

  {title:'Mathematical Concepts and Methods', arr:
  [{title:'', arr:[
    ['',138,10006,128,106,10673,11121,10791,10717,10820,571,11029,10023,10308,10105,10375,11027,10056,10491,10759,542,10277,10169,11181,557,10900,11176,10417,10183,10303,10518,10862,10334,10229,763,10236,991,10079,10940,10359,10519,10918,11069,10910,10254,10328,10157,10247,10516,10128,10081,10943,10721,10912,10616,11125,10205,701,696,254,10994,306,10570]
   ]}
  ]},

  {title:'Graph Algorithms and Implementation Techniques', arr:
  [{title:'', arr:[
    ['',567,10034,10048,10397,10369,658,10099,10801,10986,558,515,104,125,10803,10330,10806,11045,753,563,10746,10594,10985,10608,10158,10269,10273]
   ]}
  ]}
])

.value('AOAPC_2ed', [
  {title:'Arrays and Strings', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Functions and Recursion', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'C++ and STL', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Data Structures', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Brute Force', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Algorithm Design', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Dynamic Programming', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Maths', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Graph Theory', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},

  {title:'Advanced Topics', arr:
  [{title:'', arr:[
    ['']
   ]}
  ]},
])

.factory('AOAPC_parse_problems', function () {
  return function (chapters) {
    var problems = [];
    for (var cc = 0; cc < chapters.length; cc++) {
      var c = chapters[cc];
      for (var i = 0; i < c.arr.length; i++) {
        var sc = c.arr[i];
        for (var j = 0; j < sc.arr.length; j++) {
          var ssc = sc.arr[j];
          for (var k = 1; k < ssc.length; k++) {
            problems.push(ssc[k]);
          }
        }
      }
    }
    return problems;
  };
})

.factory('AOAPC_1ed_numbers', function (AOAPC_1ed, AOAPC_parse_problems) { return AOAPC_parse_problems(AOAPC_1ed); })
.factory('AOAPC_2ed_numbers', function (AOAPC_2ed, AOAPC_parse_problems) { return AOAPC_parse_problems(AOAPC_2ed); })
//.factory('cpbook3_numbers', function (cpbook_3ed, AOAPC_parse_problems) { return AOAPC_parse_problems(cpbook_3ed); })

.factory('AOAPC_db', function (create_uhunt_db) {
  return create_uhunt_db('aoapc', {
    'show': 'string',
    'chapter': 'int',
    'edition': 'int',
  });
})

.directive('uhuntAoapc', function (uhunt, uhunt_util, AOAPC_db, uhunt_problems, AOAPC_1ed, AOAPC_2ed, cpbook_3ed) {
  return {
    scope: {},
    replace: true,
    // scope: { number:'=uhuntProblemSearch', show:'=', hide:'=', search:'=', },
    templateUrl: 'partials/AOAPC.html',
    link: function (scope, element, attrs) {
      console.time('AOAPCCtrl');
      var AOAPC_chapters = [ AOAPC_1ed, AOAPC_2ed, cpbook_3ed ];
      var nth = ['1st', '2nd', 'Training Guide'];
      var color = ['blue', 'brown', 'green'];
      var img = ['images/cp.jpg', 'images/cp2-small.png', 'images/cp3.png'];
      var link = [
        'http://www.lulu.com/product/paperback/competitive-programming/12110025',
        'http://www.lulu.com/product/paperback/competitive-programming-2/16377304',
        'http://www.lulu.com/shop/steven-halim/competitive-programming-3/paperback/product-21031836.html'
      ];
      scope.color1 = color[0];
      scope.color2 = color[1];
      scope.color3 = color[2];
      scope.edition = Math.min(2, AOAPC_db.exists('edition') ? AOAPC_db.get('edition') : 2);
      scope.chapter = AOAPC_db.get('chapter') || -1;
      scope.show_chapter_type = AOAPC_db.get('show') || 'Starred'; // Starred or Everything.

      function apply_edition() {
        scope.nth_ed = nth[scope.edition];
        scope.lulu_link = link[scope.edition];
        scope.cpbook_image = img[scope.edition];
        scope.other_ed = nth[1 - scope.edition];
        scope.other_color = color[1 - scope.edition];
        scope.chapters = AOAPC_chapters[scope.edition];
        scope.build_sections();
        AOAPC_db.set('edition', scope.edition);
      }

      scope.set_chapter = function (chapter, type) {
        if (type) {
          AOAPC_db.set('show', type);
          scope.show_chapter_type = type;
        }
        if (scope.chapter === chapter && !type) {
          scope.chapter = -1;
        } else {
          scope.chapter = chapter;
        }
        scope.build_sections();
        AOAPC_db.set('chapter', scope.chapter);
      };

      scope.is_selected_and = function (type, index) { return scope.chapter == index && scope.show_chapter_type == type; };
      scope.not_is_selected_and = function (type, index) { return !scope.is_selected_and(type, index); };

      scope.build_sections = function () {
        // console.log('build_sections chapter = ' + scope.chapter + '; problems ready = ' + uhunt_problems.ready());
        if (scope.chapter < 0 || !uhunt_problems.ready()) return;
        var c = scope.chapters[scope.chapter];
        if (!c) return;
        var sections = [];
        for (var i = 0, LN = 0, RN = 0; i < c.arr.length; i++) {
          var sc = c.arr[i], nsolved = 0, ntotal = 0, nhead = 0, s = [];
          for (var j = 0; j < sc.arr.length; j++) {
            var ssc = sc.arr[j], ss = [], sub_solved = 0, sub_total = 0; nhead++;
            for (var k = 1; k < ssc.length; k++) {
              if (scope.show_chapter_type == 'Starred' && ssc[k] > 0) continue;
              var p = uhunt_problems.num(Math.abs(ssc[k]));
              if (!p) continue;
              var st = uhunt.user.stats(p.pid);
              var status = '<b>--- ? ---</b>', ntry = st.ntry;
              if (st.ac){
                status = '<b><tt style="color:green">&#x2714; '+
                  uhunt_util.format_ms(st.mrun) + 's/' + (st.rank < 10000 ? st.rank : '&gt;10K');
                if (ntry > 0) status += '(' + ntry + ')';
                status += '</tt></b>';
                nsolved++;
                sub_solved++;
              } else if (ntry>0){
                status = '<b style="color:orange">Tried (' + ntry + ')</b>';
              }
              ss.push({
                status: '&nbsp;' + status, p: p, starred: ssc[k] < 0,
                level: 10 - Math.floor(Math.min(10, Math.log(p.dacu? p.dacu : 1)))
              });
              ntotal++;
              sub_total++;
            }
            s.push({
              title : '&nbsp;' + ssc[0] + ' <tt>(' + sub_solved + '/' + sub_total + ')</tt>',
              sections: ss,
            });
          }
          sections.push({
            float: LN <= RN ? 'left' : 'right',
            section_title: sc.title + ' <tt>(' + nsolved + '/' + ntotal + ' = ' + Math.floor(nsolved/ntotal*100)+'%)</tt>',
            sections: s,
          });
          ntotal += nhead;
          if (LN <= RN) LN += ntotal; else RN += ntotal;
        }
        scope.sections = sections;
      }

      scope.switch_edition = function(ed) {
        scope.edition = ed;
        apply_edition();
      };

      scope.uhunt_problems = uhunt_problems;
      apply_edition();
      scope.$watch('uhunt_problems.version', scope.build_sections);
      uhunt.user.on('update', scope.build_sections);

      scope.percentage = function (c, show) {
        var solved = 0, total = 0;
        for (var i=0; i<c.arr.length; i++){
          var sc = c.arr[i];
          for (var j=0; j<sc.arr.length; j++){
            var ssc = sc.arr[j];
            for (var k=1; k<ssc.length; k++){
              if (show == 'Starred' && ssc[k] > 0) continue;
              var p = uhunt_problems.num(Math.abs(ssc[k]));
              if (!p) continue;
              if (uhunt.user.stats(p.pid).ac) solved++;
              total++;
            }
          }
        }
        return Math.floor(solved * 100 / total);
      };
      console.timeEnd('AOAPCCtrl');
    }
  };
})

;
