using System.Web;
using System.Web.Optimization;

namespace MailingAddressApp
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));
            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/Angular/angular.js",
                "~/Scripts/Angular/angular-animate.js",
                "~/Scripts/Angular/angular-touch.js",
                "~/Scripts/Angular/angular-locale_ru-ru.js",
                "~/Scripts/Angular/angular-ranger.js"
            ));
            bundles.Add(new StyleBundle("~/Content/bootstrap").Include(
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-theme.css",
                "~/Content/bootstrap-additions.css",
                "~/Content/angular-ranger.css",
                "~/Content/ui-bootstrap-csp.css"
            ));
            bundles.Add(new ScriptBundle("~/bundles/angular-strap").Include(
                "~/Scripts/Angular/AngularStrap/angular-strap.js",
                "~/Scripts/Angular/AngularStrap/angular-strap.tpl.js",
                "~/Scripts/Angular/AngularStrap/date-parser.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/angular-ui").Include(
                "~/Scripts/Angular/angular-ui/ui-bootstrap.js",
                "~/Scripts/Angular/angular-ui/ui-bootstrap-tpls.js"
            ));
        }
    }
}