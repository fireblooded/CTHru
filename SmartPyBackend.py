import smartpy as sp
        
def verification():
    class Verification(sp.Contract):
        def __init__(self, pledge, verificationStatus):
            self.pledgeReference = pledge
            self.verified = verificationStatus

class Company:
    def __init__(self, id):
        self.id = id
        self.pledges = sp.list(t = Pledge, l = [])

    def createPledge():
        newPledge = Pledge(self.id)
        pledges.push(newPledge)

        
class ThirdParty:
    def __init__(self, id, credibility):
        self.id = id
        self.credibility = credibility

    def voteOnPledge(self, pledge, voteChoice):
        pledge.vote(self.id, voteChoice, self.credibility)

@sp.module
def pledge():
    class Pledge(sp.Contract):
        def __init__(self, owner):
            self.owner = owner
            
            # Pledge is evaluated after 3 votes to verify or dispute
            self.eval_start = 3
            self.allVotes = []
    
            self.verify = 0
            self.dispute = 0
    
            self.status = None
            self.scenario = None

        @sp.entrypoint
        def setScenario(self, scenario):
            self.scenario = scenario
    
        @sp.entrypoint
        def vote(self, id, vote, credibility):
            assert self.data.status, "Voting has concluded."
            assert sum([vote[0] == sp.sender for vote in self.data.allVotes]) == 0, "You have already voted on this project."
            assert sp.sender != self.data.owner, "You cannot vote on your own project."
        
            self.data.allVotes.push((sp.sender, vote))
            
            if vote:
                self.data.verify += vote.credibility
            else:
                self.data.dispute += vote.credibility
        
            if len(self.data.allVotes) >= self.data.eval_start:
                self.evaluation()

        @sp.entrypoint
        def evaluation(self):
            chooseToVerify = None
            
            if self.data.verify != self.data.dispute:
                chooseToVerify.value = self.data.verify > self.data.dispute
            else:
                voting = 0
                for vote in self.data.allVotes:
                    voting += 1 if vote[0] else 0
                numberOfPositiveVotes = self.eval_start / 2 + 1
                if voting >= numberOfPositiveVotes:
                    chooseToVerify = True
                else:
                    chooseToVerify = False
                #chooseToVerify = voting >= numberOfPositiveVotes
                # chooseToVerify = voting >= sp.fst(sp.ediv(self.eval_start, 2).open_some()) + 1
                
            self.data.status = chooseToVerify
            self.scenario += verification.Verification(self, chooseToVerify)


@sp.add_test()
def test():
    companyID = 1000
    thirdParty1 = ThirdParty(500, 1)
    thirdParty2 = ThirdParty(300, 0.25)
    thirdParty3 = ThirdParty(100, 0.65)

    scenario = sp.test_scenario("Pledge", pledge)
    contract = pledge.Pledge(companyID)
    scenario += contract
    contract.setScenario(scenario)

    thirdParty1.voteOnPledge(contract, True)
    thirdParty2.voteOnPledge(contract, False)
    thirdParty3.voteOnPledge(contract, False)

    scenario.verify(contract.status == True);