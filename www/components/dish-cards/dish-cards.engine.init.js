"use strict";

function multiTaskView(appContainer, data) {
    "use strict";

    var context = new MotionContext(),
        solver = context.solver(),
        scale = 0.42,
        lastApp = null,
        apps = [],
        APP_WIDTH = 750 * scale,
        APP_HEIGHT = 1336 * scale,
        GROWTH_FACTOR = 0.02,
        X_MARGIN = 60,
        Y_MARGIN = 70,
        // (left) space between apps
        LEFT_GAP = 5,
        // (right) space after apps are moved
        RIGHT_GAP = APP_WIDTH * -0.2;

    for (var i = 0; i < data.length; i++) {
        var node = document.createElement("div"),
            app = new Box(node),
            growthFactor = i * GROWTH_FACTOR,
            h = APP_HEIGHT * (growthFactor / 2),
            w = APP_WIDTH * growthFactor,

            // Create the HTML structure
            screen = document.createElement("img"),
            title = document.createElement("span"),
            icon = document.createElement("img");

        screen.src = data[i].image;

        icon.src = data[i].icon;
        title.appendChild(icon);
        title.appendChild(document.createTextNode(data[i].name));

        node.className = "app";
        node.appendChild(title);
        node.appendChild(screen);

        // Create the constraints
        app.x = new c.Variable({
            name: "app-" + i + "-x"
        });
        app.right = new c.Variable({
            name: "app-" + i + "-right"
        });
        app.edge = new c.Variable({
            name: "app-" + i + "-right-edge"
        });
        app.y = Y_MARGIN - h;
        app.bottom = APP_HEIGHT + h;

        // App's width
        solver.add(eq(app.right, c.plus(app.x, APP_WIDTH + w), medium));

        // App's right gap
        solver.add(eq(app.edge, c.plus(app.right, RIGHT_GAP), medium));

        // Pin the first app to 0, and add a motion constraint
        if (i === 0) {
            solver.add(eq(app.x, 0, weak, 100));
            context.addMotionConstraint(new MotionConstraint(app.x, ">=", 0));
            context.addMotionConstraint(new MotionConstraint(app.x, "<=", X_MARGIN));
        } else {
            // The app mustn't reveal any space between it and the previous app.
            solver.add(leq(app.x, apps[i - 1].edge, medium, 0));

            // Make the app tend toward the left (zero). Use a lower priority than
            // the first app so the solver will prefer for the first app to be
            // zero than any of the additional apps.
            solver.add(eq(app.x, 0, weak, 0));

            // The app must be to the right of the previous app's left edge, plus the left gap
            solver.add(geq(app.x, c.plus(apps[i - 1].x, LEFT_GAP), medium, 0));
        }

        apps.push(app);
        context.addBox(app);
        appContainer.appendChild(app.element());
        lastApp = app;
    }

    // Modify CSS properties to maintain a clear view of the apps
    for (var i = 0; i < apps.length - 1; i++) {
        attachObserver(apps[i], apps[i + 1]);
    };

    // Make a manipulator. It takes touch events and updates a constrained variable
    // from them.
    var handler = new Manipulator(lastApp.x, appContainer, "x");
    context.addManipulator(handler);
}

function attachObserver(current, next) {
    "use strict";

    var offset = 100,
        $current = current.element(),
        $next = next.element(),
        observer = new MutationObserver(function(mutations) {
            var mutation = mutations[mutations.length - 1];
            if (mutation.attributeName === "style") {

                // e.g., translate3d(4px, 64px, 0px)
                var transform = mutation.target.style.transform,
                    values = transform
                    .replace(/translate3d\(|\s|\)/g, "")
                    .split(","),
                    distance = next.x.value - current.x.value,
                    factor = (distance / offset);

                factor = factor > 1 ? 1 : factor;

                var opacity = factor,
                    blur = "blur(" + ((1 - factor) * 10) + "px)";

                /*$current.style["-webkit-filter"] = blur;
                $current.style["-moz-filter"] = blur;
                $current.style["-o-filter"] = blur;
                $current.style.filter = blur;*/

                $current.style.opacity = opacity;
            }
        });

    observer.observe($next, {
        attributes: true,
        childList: false,
        characterData: false
    });
};