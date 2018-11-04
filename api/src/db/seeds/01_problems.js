exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex("problems")
        .del()
        .then(function() {
            // Inserts seed entries
            return knex("problems").insert([
                {
                    id: 1,
                    title: "Addition",
                    text: "Write a function that returns the sum of `a` and `b`",
                    status: "active"
                },
                {
                    id: 2,
                    title: "Subtraction",
                    text: "Write a function that returns the difference of `a` and `b`",
                    status: "inactive"
                }
            ])
        })
}
