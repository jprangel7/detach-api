module.exports = {
    test(request, response) {
        return response.send({ ok: 'OK', user: request.userId });    
    }
};
