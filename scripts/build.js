const ncp = require('ncp').ncp;
const fs = require('fs');
const gulp = require('gulp');
const version = require('gulp-version-number');
const path = require('path');

const seoFiles = require('./seo');

console.log('-----BUILD START-----');

// Cleanup
if (fs.existsSync('./www')) {
  console.log('\u2705 Removing old www folder');
  fs.rmSync('./www', { recursive: true });
}

// www creation
fs.mkdirSync('./www');
console.log('\u2705 Creating a new www folder');

// Copy and remaining build process (SEO + versioning public files)
ncp('./src', './www', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('\u2705 Done coping of src folder!');

  // #region SEO optimization pages
  var sitemapXmlData = [];
  console.log('Generating SEO files');
  const originalViewPath = path.join(__dirname, '..', 'src', 'views', 'index.ejs');
  for (var seoFile of seoFiles) {
    // copy original view and read it
    const newViewPath = path.join(__dirname, '..', 'www', 'views', seoFile.file.name);
    fs.copyFileSync(originalViewPath, newViewPath);
    let data = fs.readFileSync(newViewPath, 'utf8');

    // parse - title
    const titleRegex = /<title>.*?<\/title>/g;
    data = data.replace(titleRegex, `<title>${seoFile.html.title}</title>`);

    // parse - og title
    const ogTitleRegex = /<meta property="og:title" content=".*?>/g;
    data = data.replace(ogTitleRegex, `<meta property="og:title" content="${seoFile.html.title}">`);

    // parse - twitter title
    const twitterTitleRegex = /<meta name="twitter:title" content=".*?>/g;
    data = data.replace(twitterTitleRegex, `<meta name="twitter:title" content="${seoFile.html.title}">`);

    // parse - keywords
    const keywordsRegex = /<meta name="keywords" content=.*?>/g;
    data = data.replace(keywordsRegex, `<meta name="keywords" content="${seoFile.html.keywords}">`);

    // parse - content
    const contentRegex = /<p class="headline">.*?<\/p>/g;
    data = data.replace(contentRegex, `<p class="headline">${seoFile.content.pageText}</p>`);

    // sitemap.xml array
    sitemapXmlData.push(
      `<url>
      <loc>https://iswebsiteup.com/${seoFile.file.name.replace('.ejs', '')}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.9</priority>
      </url>`
    );

    fs.writeFileSync(newViewPath, data, 'utf8');

    console.log(`\t\u2705 Done ${seoFile.file.name}`);
  }
  // #endregion

  // #region sitemap.xml

  const sitemapPath = path.join(__dirname, '..', 'www', 'public', 'sitemap.xml');
  const sitemapRegex = /<\/urlset>/g;
  let sitemapData = fs.readFileSync(sitemapPath, 'utf8');
  sitemapData = sitemapData.replace(sitemapRegex, `${sitemapXmlData.join('')}</urlset>`);
  fs.writeFileSync(sitemapPath, sitemapData, 'utf8');

  console.log('\u2705 Done updating sitemap.xml with seo files.');

  // #endregion

  // #region Versioning JS/CSS
  const versionConfig = {
    value: '%MDS%',
    append: {
      key: 'v',
      to: ['css', 'js']
    }
  };

  gulp.src('www/**/*.ejs')
    .pipe(version(versionConfig))
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));

  console.log('\u2705 Done versioning JS/CSS');
  // #endregion

  console.log('-----BUILD DONE-----');
});
