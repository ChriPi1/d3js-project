let data = {"name" : "Email", "info" : "tst", "children" : [
    {"name" : "students", "children" : [
            {"name" : "dobler-heinz@fhooe.at" },
            {"name" : "s2110307030@fhooe.at" },
            {"name" : "A14" },
            {"name" : "A15" },
            {"name" : "A16" }
        ] },
    {"name" : "A2", "children" : [
            {"name" : "A21" },
            {"name" : "A22", "children" : [
            {"name" : "A221" },
            {"name" : "A222" },
            {"name" : "A223" },
            {"name" : "A224" }
        ]},
            {"name" : "A23" },
            {"name" : "A24" },
            {"name" : "A25" }] },
    {"name" : "A3", "children": [
            {"name" : "A31", "children" :[
                    {"name" : "A311" },
                    {"name" : "A312" },
                    {"name" : "A313" },
                    {"name" : "A314" },
                    {"name" : "A315" }
                ]}
            ] },
    {"name" : "A5", "children" : [
        {"name" : "A21" },
        {"name" : "A22", "children" : [
            {"name" : "A221" },
            {"name" : "A222" },
            {"name" : "A223" },
            {"name" : "A224" }
    ]},
        {"name" : "A23" },
        {"name" : "A24" },
        {"name" : "A25" }] }
]};

let createRadialTree = function (input) {
    let height = 600;
    let width = 600;

    let svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let diameter = height * 0.75;
    let radius = diameter / 2;

    let tree = d3.tree()
        .size([2*Math.PI, radius])
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

    let data = d3.hierarchy(input)

    let treeData = tree(data);
   
    let nodes = treeData.descendants();
    let links = treeData.links();
    
    let graphGroup = svg.append('g')
        .attr('transform', "translate("+(width/2)+","+(height/2)+")");

    graphGroup.selectAll(".link")
        .data(links)
        .join("path")
        .attr("class", "link")
        .attr("d", d3.linkRadial()
            .angle(d => d.x)
            .radius(d => d.y));
 
    let node = graphGroup
        .selectAll(".node")
        .data(nodes)
        .join("g")
        .attr("class", "node")
        .attr("transform", function(d){
            return `rotate(${d.x * 180 / Math.PI - 90})` + `translate(${d.y}, 0)`;
        });


    node.append("circle").attr("r", 1);

    node.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("dx", function(d) { return d.x < Math.PI ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < Math.PI ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < Math.PI ? null : "rotate(180)"; })
        .text(function(d) { return d.data.name; });
};

//createRadialTree(JSON.stringify("tree.json"));
createRadialTree(data);