module.exports = function(grunt){

  require("jit-grunt")(grunt, {
    sprite: "grunt-spritesmith"
  });

  grunt.config.init({

    dir : {
      src : "src"
    },

    ect : {
      pc : {
        files : [{
          expand : true,
          cwd    : "src/template/main/",
          src    : ["*.ect"],
          dest   : "./",
          ext    : ".html"
        }]
      },
      tumblr : {
        variables : {
          source_domain : "//rawgit.com/takuhito-h/miketroizu-source/master/"
          // source_domain : ""
          // source_domain : "https://dl.dropboxusercontent.com/u/12913911/miketrois/"
        },
        files : [{
          expand : true,
          cwd    : "src/template-tumblr/",
          src    : ["*.ect"],
          dest   : "./",
          ext    : ".html"
        }]
      }
    },

    imagemin : {
      pc : {
        options : {
          optimizationLevel : 3
        },
        files : [{
          expand : true,
          cwd    : "img/",
          src    : ["**/*.{png,jpg,gif}"],
          dest   : "img/"
        }]
      },
    },

    sass : {
      pc : {
        options : {
          sourcemap : false
        },
        files : [{
          expand : true,
          cwd    : "<%= dir.src %>/sass",
          src    : ["*.scss"],
          dest   : "css",
          ext    : ".css"
        }]
      }
    },

    autoprefixer : {
      pc : {
        options : {
          map      : true,
          browsers : ["last 3 versions", "ie 8"]
        },
        src : "css/trunk-*.css"
      }
    },

    uglify : {
      pc : {
        files : {
          "js/script.min.js" : [
            "src/js/vendor/*.js",
            "src/js/library/*.js",
            "src/js/application.js"
          ]
        }
      }
    },

    sprite : {
      pc : {
        src         : "<%= dir.src %>/img/sprites/*.png",
        destImg     : "img/sprite.png",
        imgPath     : "../img/sprite.png",
        destCSS     : "<%= dir.src %>/sass/setup/_sprites.scss",
        algorithm   : "binary-tree",
        padding     : 2,
        cssTemplate : "src/img/spritesmith.mustache"
      }
    },

    watch : {
      pc_template : {
        files : ["<%= dir.src %>/template/**/*.ect"],
        tasks : ["ect:pc"]
      },

      tumblr_template : {
        files : ["<%= dir.src %>/template-tumblr/**/*.ect"],
        tasks : ["ect:tumblr"]
      },

      pc_js : {
        files : ["<%= dir.src %>/js/*.js", "<%= dir.src %>/js/**/*.js"],
        tasks : ["uglify:pc"]
      },

      pc_css : {
        files : ["<%= dir.src %>/sass/*.scss", "<%= dir.src %>/sass/**/*.scss"],
        tasks : ["sass:pc", "autoprefixer:pc"]
      },

      pc_sprite : {
        files : ["<%= dir.src %>/img/sprites/*.png"],
        tasks : ["sprite:pc"]
      }
    }
  });

  // mozjpegが存在したら、imageminにmozjpeg使用のオプションを追加
  if(grunt.file.exists("node_modules/imagemin-mozjpeg")){
    var mozjpeg = require("imagemin-mozjpeg");

    grunt.config.set(["imagemin", "pc", "options", "use"], [mozjpeg()]);
  }

  grunt.registerTask("build", ["sprite:pc", "sass:pc", "autoprefixer:pc", "uglify:pc"]);

};