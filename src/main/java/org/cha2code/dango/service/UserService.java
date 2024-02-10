package org.cha2code.dango.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cha2code.dango.dto.UserMasterDto;
import org.cha2code.dango.entity.UserMaster;
import org.cha2code.dango.repository.UserMasterRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
	private final UserMasterRepository repo;

	private final PasswordEncoder passwordEncoder;

	public UserMasterDto getUserInfo(String userId) {
		return repo.findById(userId)
		           .map(UserMaster::toDTO)
		           .orElse(null);
	}

	public Page<UserMaster> searchUser(String keyword, Pageable paging) {
		return StringUtils.hasText(keyword)
				? repo.findAllWithKeyword(keyword, paging)
				: repo.findAll(paging);
	}

	@Transactional
	public boolean createData(List<UserMasterDto> dataList) {
		List<UserMaster> list = dataList.stream()
		                                .map(UserMasterDto::toEntity)
		                                .map(entity -> entity.encodePassword(passwordEncoder))
		                                .toList();

		List<UserMaster> resultList = repo.saveAll(list);

		return resultList.stream().allMatch(UserMaster::isCreated);
	}

	@Transactional
	public void updateData(List<UserMasterDto> dataList) {
		List<String> idList = dataList.stream()
		                            .map(UserMasterDto::userName)
		                            .toList();

		List<UserMaster> targetList = repo.findAllById(idList);

		for (UserMaster target : targetList) {
			for (UserMasterDto source : dataList) {
				if (target.getUsername().equals(source.userName())) {
					target.updateData(passwordEncoder,
					                  source.userPassword(),
					                  source.nickname(),
					                  source.email(),
					                  source.userRole());
				}
			}
		}

		repo.saveAll(targetList);
	}

	@Transactional
	public void deleteData(List<UserMasterDto> dataList) {
		repo.deleteAllByIdInBatch(dataList.stream()
		                                  .map(UserMasterDto::userName)
		                                  .toList());
	}
}
