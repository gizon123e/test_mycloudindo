const fs = require('fs')
const result = []

const readData = fs.readFileSync('./address.json', 'utf8');
const dataAddress = JSON.parse(readData)

for (const key in dataAddress) {
    const province = {
        id: dataAddress[key]['ID'],
        name: key,
    }
    const datRegencies = dataAddress[key]["Kabupaten/Kota"]
    const regencies = []


    for (const regKey in datRegencies) {
        const districts = [];
        const dataDistrict = datRegencies[regKey]["Kecamatan"]
        const regName = regKey.split(',')[0]

        for (const districtKey in dataDistrict) {
            const vilages = [];
            const dataVilage = dataDistrict[districtKey]["Kelurahan/Desa"];

            for (const vilagekey in dataVilage) {
                vilages.push({
                    id: dataVilage[vilagekey]["ID"],
                    name: vilagekey,
                    kode_pos: dataVilage[vilagekey]["Kode Pos"]
                })

            }

            districts.push({
                id: dataDistrict[districtKey]["ID"],
                name: districtKey,
                vilages
            })

        }
        regencies.push({
            id: datRegencies[regKey]["ID"],
            name: `${datRegencies[regKey]["Type"]} ${regName}`,
            districts: districts
        })

    }

    result.push({ ...province, regencies })


}

fs.writeFile('./finalData_nawirudin.json', JSON.stringify(result), (error) => {
    if (error) {
        console.log('An error has occurred ', error);
        return;
    }
    console.log('Data written successfully to disk');
});