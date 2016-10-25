# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes
activate :blog do |blog|
  blog.name = "blog"
  blog.prefix = "blog"
  blog.permalink = "{title}.html"
  blog.layout = "layout_single-post"
end

page '/404.html', :directory_index => false
activate :directory_indexes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
 helpers do
   def page_or_default(variable)
     current_page.data[variable] || data.site.defaults[variable]
   end

   def is_parent_menu(menuItem)
     dataCount = 0
     if menuItem.key?("url")
      dataCount = dataCount + 1
    end
     if menuItem.key?("extrahtml")
      dataCount = dataCount + 1
    end
     return menuItem.count > dataCount
   end
 end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
	activate :minify_css
	activate :minify_html, remove_input_attributes: false, remove_quotes: false, remove_style_attributes: false
	activate :minify_javascript
	activate :asset_hash, :ignore => [/^vendor\/simple-line-icons/]
	activate :relative_assets
	ignore 'partials/*'
	activate :gzip
end
set :url_root, 'http://eamstaffing.com'
activate :search_engine_sitemap

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'eamstaffing.com'
  s3_sync.region                     = 'us-east-1'
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.acl                        = 'public-read'
  s3_sync.prefix                     = ''
  s3_sync.index_document             = 'index.html'
  s3_sync.error_document             = '404.html'
end

# default_caching_policy max_age:(60 * 60 * 24 * 7)
# caching_policy 'text/css', max_age: (60 * 60 * 24 * 30), must_revalidate: true
# caching_policy 'text/js', max_age: (60 * 60 * 24 * 30), must_revalidate: true
# caching_policy 'image/png', max_age: (60 * 60 * 24 * 365), must_revalidate: true
# caching_policy 'image/jpg', max_age: (60 * 60 * 24 * 365), must_revalidate: true
# caching_policy 'image/svg', max_age: (60 * 60 * 24 * 365), must_revalidate: true
