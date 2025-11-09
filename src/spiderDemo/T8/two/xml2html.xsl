<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes" encoding="UTF-8"/>

  <!-- 根节点 -->
  <xsl:template match="/">
    <html>
      <head>
        <title>TTX dump</title>
        <style>
          body{font-family:monospace;font-size:14px;background:#fff;color:#000}
          .tbl{margin-left:1em}
          .hdr{font-weight:bold;cursor:pointer;color:#00c}
          .collapsible{display:none;margin-left:2em}
        </style>
        <script>
          function toggle(id){
            var e=document.getElementById(id);
            e.style.display=(e.style.display==='block')?'none':'block';
          }
        </script>
      </head>
      <body><xsl:apply-templates/></body>
    </html>
  </xsl:template>

  <!-- 任意元素 -->
  <xsl:template match="*">
    <div class="tbl">
      <span class="hdr" onclick="toggle('{generate-id()}')">
        &lt;<xsl:value-of select="name()"/>&gt;
      </span>
      <div id="{generate-id()}" class="collapsible">
        <xsl:apply-templates select="*"/>
        <xsl:apply-templates select="text()[normalize-space()]"/>
      </div>
    </div>
  </xsl:template>

  <!-- 文本节点 -->
  <xsl:template match="text()[normalize-space()]">
    <div><xsl:value-of select="normalize-space()"/></div>
  </xsl:template>
</xsl:stylesheet>