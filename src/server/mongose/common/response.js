module.exports = {

    LOGIN_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: true,
            email: req.body.email,
            password: req.body.password,
            statusCode: 200
        });
    },
    LOGOUT_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: false,
            email: req.body.email,
            password: req.body.password,
            statusCode: 200
        });
    },
    CHECK_ON_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: true,
            email: req.body.email,
            password: req.body.password,
            statusCode: 200
        });
    },
    LOG_USER_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: true,
            statusCode: 200
        });
    },
    USER_PERSONAL_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: true,
            statusCode: 200
        });
    },
    USER_PUBLIC_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: true,
            statusCode: 200
        });
    },
    USERS_PUBLIC_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: true,
            statusCode: 200
        });
    },
    DELETE_OK: function (message, req, res, data) {
        return res.status(200).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้สำเร็จแล้ว',
            success: true,
            email: req.body.email,
            password: req.body.password,
            statusCode: 200
        });
    },
    CREATED: function (message, req, res, data) {
        return res.status(201).json({
            result: data,
            message: message,
            messageCode: 'คำขอได้รับการตอบสนองและได้สร้างแหล่งข้อมูลใหม่อย่างน้อยหนึ่งรายการขึ้นไป',
            success: true,
            email: req.body.email,
            password: req.body.password,
            statusCode: 201,
        });
    },
    UNAUTHORIZED: function (message, res) {
        return res.status(401).json({
            result: {},
            message: message,
            messageCode: 'ไม่ได้ใช้คำขอนี้เนื่องจากไม่มีข้อมูลประจำตัวสำหรับการรับรองความถูกต้องสำหรับรีซอร์สเป้าหมาย',
            success: false,
            statusCode: 401
        });
    },
    NOT_FOUND: function (message, res) {
        return res.status(404).json({
            result: {},
            message: message,
            messageCode: 'เซิร์ฟเวอร์ต้นทางไม่พบการแสดงผลปัจจุบันสำหรับรีซอร์สเป้าหมายหรือไม่เต็มใจที่จะเปิดเผยข้อมูลนั้น',
            success: false,
            statusCode: 404
        });
    },
    CONFLICT: function (message, res) {
        return res.status(409).json({
            result: {},
            message: message,
            messageCode: "ไม่สามารถดำเนินการตามคำขอได้เนื่องจากข้อขัดแย้งกับสถานะปัจจุบันของรีซอร์สเป้าหมาย รหัสนี้ใช้ในสถานการณ์ที่ผู้ใช้อาจสามารถแก้ไขข้อขัดแย้งและส่งคำขอใหม่ได้",
            success: false,
            statusCode: 409
        })
    },
    INTERNAL_SERVER_ERROR: function (message, res) {
        return res.status(500).json({
            result: {},
            message: message,
            messageCode: 'เซิร์ฟเวอร์พบเงื่อนไขที่ไม่คาดคิดซึ่งทำให้ไม่สามารถดำเนินการตามคำขอได้',
            success: false,
            statusCode: 500,
        });
    },
}