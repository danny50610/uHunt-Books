angular.module('uHunt.CPE', ['uHunt.base'])

.value('CPE_ExamList', [
  {title:'2013', arr:
  [{title:'2013/10/01', arr:[
    ['',10190,264,10018,612,151,11336,10309
  ]]},
   {title:'2013/12/17', arr:[
    ['',12602,10235,11917,10666,657,12654,288
  ]]}
  ]},

  {title:'2014', arr:
  [{title:'2014/03/25', arr:[
    ['',10931,406,401,11040,11094,929,315
  ]]},
   {title:'2014/05/27', arr:[
    ['',10783,141,105,516,11039,10099,1101
  ]]},
   {title:'2014/09/23', arr:[
    ['',579,10409,630,10763,10407,501,753
  ]]},
   {title:'2014/12/23', arr:[
    ['',494,11054,11005,337,397,798,820
  ]]}
  ]},

  {title:'2015', arr:
  [{title:'2015/03/24', arr:[
    ['',591,10922,409,11538,534,242,302
  ]]},
   {title:'2015/05/26', arr:[
    ['',1585,10474,10908,540,536,10369,714
  ]]},
   {title:'2015/10/06', arr:[
    ['',455,490,11389,967,378,1632,240
  ]]}
  ]}
])

.factory('CPE_parse_problems', function () {
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

.factory('CPE_numbers', function (CPE_ExamList, CPE_parse_problems) { return CPE_parse_problems(CPE_ExamList); })

.factory('CPE_db', function (create_uhunt_db) {
  return create_uhunt_db('cpe', {
    'show': 'string',
    'chapter': 'int',
    'edition': 'int',
  });
})

.directive('uhuntCpe', function (uhunt, uhunt_util, CPE_db, uhunt_problems, CPE_ExamList) {
  return {
    scope: {},
    replace: true,
    // scope: { number:'=uhuntProblemSearch', show:'=', hide:'=', search:'=', },
    templateUrl: 'partials/CPE.html',
    link: function (scope, element, attrs) {
      console.time('CPECtrl');
      var CPE_chapters = [ CPE_ExamList ];
      var nth = ["1st Edition", "2nd Edition", "Training Guide"];
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
      scope.edition = 0; //Math.min(0,CPE_db.exists('edition') ? CPE_db.get('edition') : 1);
      scope.chapter = CPE_db.get('chapter') || -1;
      scope.show_chapter_type = CPE_db.get('show') || 'Starred'; // Starred or Everything.

      function apply_edition() {
        scope.nth_ed = nth[scope.edition];
        scope.lulu_link = link[scope.edition];
        scope.cpbook_image = img[scope.edition];
        scope.other_ed = nth[1 - scope.edition];
        scope.other_color = color[1 - scope.edition];
        scope.chapters = CPE_chapters[scope.edition];
        scope.build_sections();
        CPE_db.set('edition', scope.edition);
      }

      scope.set_chapter = function (chapter, type) {
        if (type) {
          CPE_db.set('show', type);
          scope.show_chapter_type = type;
        }
        if (scope.chapter === chapter && !type) {
          scope.chapter = -1;
        } else {
          scope.chapter = chapter;
        }
        scope.build_sections();
        CPE_db.set('chapter', scope.chapter);
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
              var p = uhunt_problems.num(Math.abs(ssc[k]));
              if (!p) continue;
              if (uhunt.user.stats(p.pid).ac) solved++;
              total++;
            }
          }
        }
        return Math.floor(solved * 100 / total);
      };
      console.timeEnd('CPECtrl');
    }
  };
})

;
