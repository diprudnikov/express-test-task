const CONTRACT_STATUS = {
    NEW: 'new',
    IN_PROGRESS: 'in_progress',
    TERMINATED: 'terminated'
};

const PROFILE_TYPE = {
    CLIENT: 'client',
    CONTRACTOR: 'contractor'
}

const PROFILE_ID_MAP = {
    [PROFILE_TYPE.CLIENT]: 'ClientId',
    [PROFILE_TYPE.CONTRACTOR]: 'ContractorId'
}

const ERROR_MESSAGES = {
    CLIENT_BALANCE: 'Client balance is less than job price',
    JOB_PAID: 'Job has already been paid',
    DEPOSIT: 'Deposit amount is more than 25% of all the jobs to pay',
}

module.exports = {
    CONTRACT_STATUS,
    PROFILE_TYPE,
    PROFILE_ID_MAP,
    ERROR_MESSAGES
}
