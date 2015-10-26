class MyClass(GeneratedClass):
    def __init__(self):
        GeneratedClass.__init__(self)

    def onLoad(self):
        #put initialization code here
        pass

    def onUnload(self):
        #put clean-up code here
        pass

    def onInput_onStart(self, url):
        from HTMLParser import HTMLParser
        import urllib2, contextlib

        class ContentParser(HTMLParser):
            def __init__(self):
                HTMLParser.__init__(self)
                self.inscript = False
                self.inbody = False
                self.text = ""

            def handle_starttag(self, tag, attrs):
                if tag == "body":
                    self.inbody = True
                if tag == "script":
                    self.inscript = True

            def handle_endtag(self, tag):
                if tag == "body":
                    self.inbody = False
                if tag == "script":
                    self.inscript = False

            def handle_data(self, data):
                if self.inbody and not self.inscript:
                    self.text = self.text + data

        try:
            timeout = int(self.getParameter("Timeout"))
            self.logger.info("Loading... %s" % url)
            with contextlib.closing(urllib2.urlopen(url, None, timeout)) as response:
                parser = ContentParser()
                parser.feed(response.read())
                parser.close()

                lines = [line for line in parser.text.splitlines() if len(line.strip()) > 0]
                startline = int(self.getParameter("StartLine"))
                maxlines = int(self.getParameter("MaxLines"))
                text = "\\pau=200\\".join(lines[startline:startline + maxlines])
                self.logger.info("Loaded: %s" % text)
                self.onStopped(text)
        except urllib2.URLError, message:
            self.logger.warn("Failed to open: %s, message=%s" % (url, message))
            self.onFailed(message)
