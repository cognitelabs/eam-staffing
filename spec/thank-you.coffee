thankurl = 'http://localhost:4567/thank-you'

casper.test.begin "The page is up", (test) ->
	casper.start thankurl, ->
		test.assertHttpStatus(200, "The page is up!")
	casper.run ->
		test.done()