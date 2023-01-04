let data = {"name" : "SE", "children" : [
    {"name" : "1. Sem", "children" : [
            {"name" : "LGI","children": [
                {"name" : "VO"},
                {"name" : "UE"},
            ]},
            {"name" : "ADE", "children": [
                {"name" : "VO"},
                {"name" : "UE"},
            ]},
            {"name" : "EIR", "children": [
                {"name" : "VO"},
                {"name" : "UE"},
            ]},
            {"name" : "OS" },
            {"name" : "SWE", "children": [
                {"name" : "VO"},
                {"name" : "UE"},
            ]},
            {"name" : "BWL" },
            {"name" : "Englisch" },
            {"name" : "Teambuilding" },
        ] },
    {"name" : "2. Sem", "children" : [
        {"name" : "Mathe","children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "ADF", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "OS", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "CNW", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "DBS1", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "SWE", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "BWL" },
        {"name" : "Englisch" },
    ] },
    {"name" : "3. Sem", "children": [
        {"name" : "Mathe","children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "CNW", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "DBS2", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "SWO3", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "SWE3", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "WDP", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
    ] },
    {"name" : "4. Sem", "children" : [
        {"name" : "GCB", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "DBS3", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "SWO4", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "Scripting" },
        {"name" : "Seminar" },
        {"name" : "SWE4", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "Projekt" },
        {"name" : "Mathe", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]}
    ] },
    {"name" : "5. Sem", "children" : [
        {"name" : "KOS", "children": [
            {"name" : "VO"},
            {"name" : "UE"},
        ]},
        {"name" : "WAF", "children" : [
            {"name" : "VO" },
            {"name" : "UE" },
    ]},
        {"name" : "BAC-Arbeit" },
        {"name" : "Projekt" },
        {"name" : "Wachlfach" },
        {"name" : "WEB" },
    ] },
    {"name" : "6. Sem", "children" : [
        {"name" : "Praktikum" },
        {"name" : "BAC-Pruefung" },
        {"name" : "WEB" },
    ] }
]};

let createRadialTree = function (input) {
    let height = 800;
    let width = 800;

    let svg = d3.select('#tree-example')
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

    graphGroup.selectAll(".link-tree")
        .data(links)
        .join("path")
        .attr("class", "link-tree")
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


    node.append("circle")
        .attr("r", 3)
        .attr("fill", "blue")
        .attr("stroke", "black")
        .attr("stroke-width", 1);

    node.append("text")
        .attr("font-family", "Courier New")
        .attr("font-size", 15)
        .attr("dx", function(d) { return d.x < Math.PI ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < Math.PI ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < Math.PI ? null : "rotate(180)"; })
        .text(function(d) { return d.data.name; });
};

createRadialTree(data);