module.exports.next = ring;

var RINGS = [
    { from: "8:30", to: "10:00" },
    { from: "10:10", to: "11:40" },
    { from: "11:50", to: "13:40" },
    { from: "13:50", to: "15:20" },
    { from: "15:30", to: "17:00" },
    { from: "17:10", to: "18:40" },
    { from: "18:50", to: "20:20" }
];

function ring() {
    return "Звонок";
}