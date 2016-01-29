# Test the Homepage
home = 'http://localhost:4567/'

casper.test.begin "The homepage is up", (test) ->
	casper.start home, ->
		test.assertHttpStatus(200, home + 'is up!')
	casper.run ->
		test.done()