"format cjs";
if (!document.getElementById("mocha")) {
  const mocha = document.createElement("div");
  mocha.id = "mocha";
  (document.body || document.documentElement).appendChild(mocha);
}
if (!document.getElementById("page")) {
  const page = document.createElement("div");
  page.id = "page";
  const testArea = document.createElement("div");
  testArea.id = "test-area";
  page.appendChild(testArea);
  (document.body || document.documentElement).appendChild(page);
}
