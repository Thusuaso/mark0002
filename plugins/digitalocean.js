import AWS from "aws-sdk";
const spaceEndPoint = new AWS.Endpoint("https://fra1.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spaceEndPoint,
  accessKeyId: "B7POIPPYM44Y374P23KS",
  secretAccessKey: "01CMWBcNKtFgKG6XhP+q0PlajTb2yvELaJ1igo7xsyA",
});

const oceanservice = {
    panelProductSendPhoto(file) {
        const filename = file.name;
        const params = {
            Bucket: "mekmar-image",
            Key: "products/" + filename,
            Body: file,
            ACL: "public-read",
            ContentType: "image/" + filename.split(".")[1],
            CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) reject(false);
                else resolve(true);
            });
        });

    },
    panelProductPhotoDelete(filename) {
        const params = {
            Bucket: "mekmar-image",
            Key: "products/" + filename,
        };
        return new Promise((resolve, reject) => {
            s3.deleteObject(params, (err, data) => {
                if (err) reject(false);
                else resolve(true);
            });
        });
    },
    panelProductSendTestReport(file) {
        const filename = file.name;
        const params = {
            Bucket: "mekmar-image",
            Key: "test-reports/" + filename,
            Body: file,
            ACL: "public-read",
            CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) reject(false);
                else resolve(true);
            });
        });

    },
    panelProjectProductSendPhoto(file) {
        const filename = file.name;
        const params = {
            Bucket: "mekmar-image",
            Key: "galleria-project_photos/photos/" + filename,
            Body: file,
            ACL: "public-read",
            CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) reject(false);
                else resolve(true);
            });
        });
    },
    panelProjectSendPhoto(file) {
        const filename = file.name;
        const params = {
            Bucket: "mekmar-image",
            Key: "galleria-project_photos/" + filename,
            Body: file,
            ACL: "public-read",
            CacheControl: "public,max-age=1,s-max-age=500,must-revalidate",
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) reject(false);
                else resolve(true);
            });
        });
    },
};
export default oceanservice;
