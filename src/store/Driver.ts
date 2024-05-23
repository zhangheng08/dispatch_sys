import { defineStore } from 'pinia'

export interface DriverObj {
  name: string
  mobile: string
  gender: string
  age: number
  city: string
  driving_age: number
  idcard: string
  driver_license: string
  emergency_contact: string
  no_criminal_checks: string
  road_operation_credential: string
  vaccine_status: string
  joined_date: Date
  departure_date: Date
  create_date: Date
}

export const driverDataStore = defineStore('driver_data', {
  state() {
    return {
      list: [
        {
          name: '王志利',
          mobile: '13439925988',
          gender: '男',
          age: 52,
          city: '北京',
          driving_age: 26,
          idcard: '201***********052',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '赵铎',
          mobile: '15699843622',
          gender: '男',
          city: '北京',
          age: 52,
          driving_age: 26,
          idcard: '232***********24x',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '刘铁霖',
          mobile: '19965230145',
          gender: '男',
          city: '北京',
          age: 55,
          driving_age: 32,
          idcard: '568***********30x',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '房振东',
          mobile: '18655423644',
          gender: '男',
          city: '北京',
          age: 45,
          driving_age: 20,
          idcard: '514***********215',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '郝向东',
          mobile: '15322598871',
          gender: '男',
          city: '北京',
          age: 45,
          driving_age: 22,
          idcard: '103***********112',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '魏刘',
          mobile: '13566210487',
          gender: '男',
          city: '北京',
          age: 46,
          driving_age: 24,
          idcard: '113***********58x',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '贺东',
          mobile: '13600123344',
          gender: '男',
          city: '北京',
          age: 50,
          driving_age: 30,
          idcard: '113***********117',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '王德林',
          mobile: '15988410358',
          gender: '男',
          city: '北京',
          age: 51,
          driving_age: 30,
          idcard: '110***********331',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '郑莉',
          mobile: '13896542366',
          gender: '女',
          city: '北京',
          age: 45,
          driving_age: 24,
          idcard: '110***********011',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        },
        {
          name: '田胜国',
          mobile: '13699842011',
          gender: '男',
          city: '北京',
          age: 49,
          driving_age: 22,
          idcard: '568***********364',
          driver_license: '',
          emergency_contact: '',
          no_criminal_checks: '',
          road_operation_credential: '',
          vaccine_status: '',
          create_date: '2021-01-22',
          joined_date: '2021-01-12'
        }
      ]
    }
  }
})
