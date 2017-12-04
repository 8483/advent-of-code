function distance(input) {

    var steps = 0;

    if (input > 1) {

        var n = 0;
        var corner_br = 0; // Bottom right.

        while ( corner_br <= input) {
            corner_br = Math.pow((2 * n + 1), 2);
            n++;
        }

        var side = 2 * n - 1;

        var corner_bl = corner_br - side + 1; // Bottom left.
        var corner_tl = corner_bl - side + 1; // Top left.
        var corner_tr = corner_tl - side + 1; // Top right.

        var corners = [ corner_br, corner_bl, corner_tl, corner_tr ];

        console.log("input:", input, "squares:", n, "corner:", corner_br, "side:", side);
        console.log("corners:", corners);

        var mid_b = corner_br - (side-1) / 2; // Bottom
        var mid_l = corner_bl - (side-1) / 2; // Left
        var mid_t = corner_tl - (side-1) / 2; // Top
        var mid_r = corner_tr - (side-1) / 2; // Right

        var mids = [ mid_b, mid_l, mid_t, mid_r ];

        console.log("mids:", mids);

        var step1 = mids.map((mid) => Math.abs(mid - input)); // First distances from input.
        var min = Math.min.apply(null, step1); // Find smallest first distance.
        steps = min + n - 1; // Smallest distance + number of squares (straight distance) = distance.
    }
    console.log(input + " is " + steps + " steps away.\n");
}

distance(289326);
