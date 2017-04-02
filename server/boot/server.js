
module.exports = function(app){
    var mongoDb = app.dataSources.MongoDB;
    mongoDb.automigrate('Customer',function(err){
        if(err){
            throw err;
        }
        var Customer = app.models.Customer;
    
        Customer.create({
            username : "sahib12",
            password : "sahib4sahib",
            email : "navlanisahib1@gmail.com",
        },function(err,user){
            if(err){
                throw err;
            }
            var role = app.models.Role;
            var roleMapping = app.models.RoleMapping;
            role.create({
                name : "admin"
            },function(err,role){
                if(err){
                    throw err;
                }
                role.principals.create({
                    principalType:roleMapping.USER,
                    principalId:user.id,
                },function(err){
                    if(err){
                        throw err;
                    }
                });
            });
        });
    });
};