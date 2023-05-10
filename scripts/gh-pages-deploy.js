const execa = require("execa");
const rmrf = require("rimraf");
let exitCode = 0;

(async () => {
    try {
        await execa("git", ["checkout", "--orphan", "gh-pages"]);
        console.log("Building...");
        await execa("npm", ["run", "build"]);
        // Understand if it's dist or build folder
        await execa("git", ["--work-tree", "dist", "add", "--all"]);
        await execa("git", ["--work-tree", "dist", "commit", "-m", "gh-pages"]);
        console.log("Pushing to gh-pages...");
        await execa("git", ["push", "origin", "HEAD:gh-pages", "--force"]);
        await rmrf("dist", { glob: false })
        console.log("Successfully deployed");
    } catch (e) {
        console.log(e.message);
        exitCode = 1;
    } finally {
        await execa("git", ["checkout", "-f", "main"]);
        await execa("git", ["branch", "-D", "gh-pages"]);
    }
    process.exit(exitCode);
})();