const notFound = (req,res) => res.status(404).json({msg : 'Error 404 : Route Does NOT Exists'})

module.exports = notFound