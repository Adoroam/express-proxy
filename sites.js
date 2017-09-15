// let Proxysite = (hn, pn) => {
//   this.hostname = hn
//   this.port = pn
// }

const sites = []
function addSite (hostname, port) {
  sites.push({ hostname: hostname, port: port })
}
addSite('asepdesign.com', 8001)
addSite('anthonystabile.com', 8002)

module.exports = sites
